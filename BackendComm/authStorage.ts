import { useMomStore } from "@/src/store/useMomStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserSession {
  token: string;
  userId: string;
  email: string;
  userName: string;
}
const ONBOARDED_KEY = "healthCard-has-onboarder";

export const hasOnboarded = async () => {
  await AsyncStorage.setItem(ONBOARDED_KEY, "true");
};
export const getIfOnboarded = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(ONBOARDED_KEY);
  return value === "true";
};

const storeUserData = async (userData: UserSession) => {
  try {
    if (!userData.userId || !userData.token) {
      throw new Error("Invalid User data object");
    }
    const jsonString = JSON.stringify(userData);
    await AsyncStorage.setItem("User_Session", jsonString);
    console.log("UserData stored succesfully");
  } catch (e) {
    throw new Error("Error storing userData");
  }
};

const getUserData = async () => {
  try {
    const session = await AsyncStorage.getItem("User_Session");
    console.log("[authStorage]  session data retrieved");
    if (!session) {
      console.log("No user session found");
      return null;
    }
    try {
      const parsedData = JSON.parse(session) as UserSession;
      console.log("data parsed successfully");
      return parsedData;
    } catch (parsedError) {
      console.log("Error parsing session data", parsedError);
      await AsyncStorage.removeItem("User_Session");
    }
  } catch (e) {
    console.error("[authStorage] Error in getUserData:", e);

    let errorMessage = "error getting user data";
    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (e && typeof e === "object") {
      errorMessage = JSON.stringify(e);
    }

    console.log("throwing error for the null", errorMessage);
    return null;
  }
};

const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("User_Session");
    const clearMom = useMomStore.getState().clearMom;
    clearMom();
  } catch (e) {
    const message = e instanceof Error ? e.message : "error clearing user data";
    throw new Error(`STORAGE_DELETE_ERROR: ${message}`);
  }
};

const authStorage = {
  storeUserData,
  getUserData,
  clearUserData,
  getIfOnboarded,
};

export default authStorage;
