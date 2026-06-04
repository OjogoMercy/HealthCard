import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserSession {
  token: string;
  userId: string;
  email: string;
  userName: string;
}

const storeUserData = async (userData: UserSession) => {
  try {
    await AsyncStorage.setItem("User_Session", JSON.stringify(userData));
  } catch (e) {
    const message = e instanceof Error ? e.message : "error storing user data";
    throw new Error(`STORAGE_WRITE_ERROR: ${message}`);
  }
};

const getUserData = async (): Promise<UserSession | null> => {
  try {
    const session = await AsyncStorage.getItem("User_Session");
    return session ? JSON.parse(session) : null;
  } catch (e) {
    const message = e instanceof Error ? e.message : "error getting user data";
    throw new Error(`STORAGE_READ_ERROR: ${message}`);
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
