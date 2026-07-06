import { getUserProfile, logoutUser } from "@/BackendComm/APIClient";
import { AuthProvider, useAuth } from "@/BackendComm/AuthContext";
import authStorage from "@/BackendComm/authStorage";
import { COLORS } from "@/src/constants/THEME";
import { useBabyStore } from "@/src/store/useBabyStore";
import axios from "axios";
import { useEffect } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import RootNavigator from "../src/navigation/RootNavigator";

function NavigationGateKeeper() {
  const setChild = useBabyStore((s) => s.setChildren);
  const clearChildren = useBabyStore((s) => s.clearChildren);
  const { session, isLoading } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const getUserData = async () => {
      if (isLoading) return;

      if (!session?.userId) {
        console.log("[NavigationGateKeeper] No valid session, clearing baby");
        clearChildren();
        return;
      }

      try {
        console.log(session.userId);
        if (!isMounted) return;
        const UserData = await getUserProfile(session.userId);
        console.log("userdaata", UserData);

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
            Alert.alert("User session expired, please log in again");
            logoutUser();
          }
        }
        console.error("[NavigationGateKeeper] Error message:", e);
      }
    };

    getUserData();
    return () => {
      isMounted = false;
    };
  }, [clearChildren, isLoading, setChild]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  console.log("[NavigationGateKeeper] Is user authenticated?:", !!session);
  return <RootNavigator isAuthenticated={!!session} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGateKeeper />
    </AuthProvider>
  );
}
