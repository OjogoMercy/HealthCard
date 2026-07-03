import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserSession {
  token: string;
  userId: string;
  email: string;
  userName: string;
}

const storeUserData = async (userData: UserSession) => {
  try {
    if (!userData.userId || !userData.token) {
      throw new Error("Invalid User data object");
    }
    console.log("Storing userdata", {
      hasUserId: !!userData.userId,
      hasToken: !!userData.token,
    });
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
    console.log("[authStorage] Raw session data:", session);
    if (!session) {
      console.log("No user session found");
      return null;
    }
    try {
      const parsedData = JSON.parse(session) as UserSession;
      console.log("parsed session data", {
        hasToken: !!parsedData.token,
        hasUserId: !!parsedData.userId,
      });
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
  } catch (e) {
    const message = e instanceof Error ? e.message : "error clearing user data";
    throw new Error(`STORAGE_DELETE_ERROR: ${message}`);
  }
};

const authStorage = {
  storeUserData,
  getUserData,
  clearUserData,
};
export default authStorage;
