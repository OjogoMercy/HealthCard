import { getUserProfile } from "@/BackendComm/APIClient";
import { AuthProvider, useAuth } from "@/BackendComm/AuthContext";
import { COLORS } from "@/src/constants/THEME";
import { useBabyStore } from "@/src/store/useBabyStore";
import { ErrorBoundary } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import storeUserData from "../BackendComm/authStorage";
import RootNavigator from "../src/navigation/RootNavigator";

function NavigationGateKeeper() {
  const { session, isLoading } = useAuth();
  const baby = useBabyStore((s) => s.baby);
  const setBaby = useBabyStore((s) => s.setBaby);
  const clearBaby = useBabyStore((s) => s.clearBaby);

  useEffect(() => {
    if (!session) {
      clearBaby();
    }

    const getUserData = async () => {
      try {
        const UserData = await getUserProfile(session?.userId ?? "");
        if (UserData) {
          storeUserData.storeUserData({
            token: session.token,
            userId: session.userId,
            email: session.email,
            userName: UserData.userName || session?.userName,
          });
        }
        if (UserData.baby) {
          setBaby(UserData.baby);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    getUserData();
  }, [session, setBaby, clearBaby]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return <RootNavigator isAuthenticated={!!session} />;
}
export default function RootLayout() {
  const [error, setError] = useState<Error | undefined>();
  return (
    <AuthProvider>
      <ErrorBoundary
        retry={() => setError(undefined)}
        error={error}
        fallback={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Error loading app...</Text>
          </View>
        }
      >
        <NavigationGateKeeper />
      </ErrorBoundary>
    </AuthProvider>
  );
}
