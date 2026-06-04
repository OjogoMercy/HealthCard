import axios from "axios";
import authStorage from "./authStorage";

const BASE_URL = "https://healthCard-backend";
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
interface UserSession {
  token: string;
  userId: string;
  email: string;
  userName: string;
}
// interceptors to attatch the tokem to eevery request if in storage
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const data = await authStorage.getUserData();
      const token = data?.token
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "error retrieving user data";
      console.error(`error fetching user data: ${message}`);
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// auth functions 
export const registerUser = async (userData: UserSession) => {
const response = await apiClient.post("/api/register", userData);
return response.data;
}

export const loginUser = async (credentials: UserSession)=>{
    const response = await apiClient.post("/api/login", credentials)
    return response.data;
}
export const logoutUser = async()=>{
    await authStorage.clearUserData();

}
export const getUserProfile = async()=> {
    const response = await apiClient.get("/api/profile");
    return response.data;
}

export default apiClient;