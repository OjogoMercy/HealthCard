import { getUserProfile } from "@/BackendComm/APIClient";
import { AuthProvider, useAuth } from "@/BackendComm/AuthContext";
import authStorage from "@/BackendComm/authStorage";
import { COLORS } from "@/src/constants/THEME";
import { useBabyStore } from "@/src/store/useBabyStore";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import RootNavigator from "../src/navigation/RootNavigator";

function NavigationGateKeeper() {
  const { session, isLoading } = useAuth();
  const setBaby = useBabyStore((s) => s.setBaby);
  const clearBaby = useBabyStore((s) => s.clearBaby);

  useEffect(() => {
    const getUserData = async () => {
      // Check if we have a valid session
      if (!session?.userId) {
        console.log("[NavigationGateKeeper] No valid session, clearing baby");
        clearBaby();
        return;
      }
      try {
        console.log(
          "[NavigationGateKeeper] Fetching user profile",
          session.userId,
        );
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
          const firstChild = profile.children[0];
          setBaby({
            name: firstChild.name,
            dob: firstChild.dateOfBirth,
            gender: firstChild.gender,
          });
          console.log("child data stored successfully");
        }
      } catch (e) {
        console.error("[NavigationGateKeeper] Error fetching user data:", e);
        if (e instanceof Error) {
          console.error("[NavigationGateKeeper] Error message:", e.message);
          console.error("[NavigationGateKeeper] Error stack:", e.stack);
        }
      }
    };

    getUserData();
  }, [session?.userId]);

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
