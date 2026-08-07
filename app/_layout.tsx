import { getUserProfile } from "@/BackendComm/APIClient";
import { AuthProvider, useAuth } from "@/BackendComm/AuthContext";
import authStorage, { hasOnboarded } from "@/BackendComm/authStorage";
import { ToastProvider, useToast } from "@/src/components/ToastContext";
import { COLORS } from "@/src/constants/THEME";
import { useBabyStore } from "@/src/store/useBabyStore";
import axios from "axios";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "../src/navigation/RootNavigator";

function NavigationGateKeeper() {
  const setChild = useBabyStore((s) => s.setChildren);
  const clearChildren = useBabyStore((s) => s.clearChildren);
  const { session, isLoading, logoutAuth } = useAuth();
  const { showToast } = useToast();
  const warmUpConnection = async () => {
    try {
      await Promise.race([
        fetch("https://backend-healthCard.onrender.com", {
          method: "HEAD",
          headers: { "cache-control": "no-cache" },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 10000),
        ),
      ]);
      console.log("connection warmed successfully");
    } catch (e) {
      console.log("warm up failed ", e);
    }
  };
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const getUserData = async () => {
      if (isLoading) return;
      const hasNoActiveSession =
        !session?.token || !session?.userId || isTokenExpired(session.token);

      if (hasNoActiveSession) {
        warmUpConnection(); // fire-and-forget, no await
      }

      if (session?.token && isTokenExpired(session.token)) {
        console.log("[NavigationGateKeeper] Token expired");

        showToast("Session Expired , Please log in again", "error");
        await logoutAuth();
        clearChildren();
        return;
      }

      if (!session?.userId) {
        console.log("[NavigationGateKeeper] No valid session, clearing baby");
        clearChildren();
        return;
      }

      try {
        console.log(session.userId);
        if (!isMounted) return;
        const UserData = await getUserProfile(session.userId);

        if (!UserData) {
          console.warn("[NavigationGateKeeper] No user data returned");
          return;
        }
        console.log("[NavigationGateKeeper] User data received:");

        if (session?.token && session?.userId && session?.email) {
          await authStorage.storeUserData({
            token: session.token,
            userId: session.userId,
            email: session.email,
            userName: UserData.profile?.userName || "",
          });
        } else {
          console.warn(
            "[NavigationGateKeeper] Cannot update user data - session missing required fields",
          );
        }
        const profile = UserData.profile;

        if (profile.children && profile.children.length > 0) {
          setChild(profile.children);
          console.log("child data stored successfully");
        } else {
          clearChildren();
        }
      } catch (e) {
        console.error("[NavigationGateKeeper] Error fetching user data:", e);

        if (axios.isAxiosError(e)) {
          if (e.response?.status === 401) {
            showToast("User session expired, please log in again", "error");
            await logoutAuth();
          }
        }
        console.error("[NavigationGateKeeper] Error message:", e);
      }
    };

    getUserData();
    return () => {
      isMounted = false;
    };
  }, [clearChildren, isLoading, setChild, logoutAuth, session]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // console.log("[NavigationGateKeeper] Is user authenticated?:", !!session);
  return (
    <RootNavigator isAuthenticated={!!session} hasOnboarded={hasOnboarded} />
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ToastProvider>
          <NavigationGateKeeper />
        </ToastProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
