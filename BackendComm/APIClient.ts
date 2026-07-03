import axios from "axios";
import authStorage from "./authStorage";

const BASE_URL = "https://backend-healthcard.onrender.com";
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: "success" | "error";
  message: string;
  token?: string;
  userId?: string;
}
// interceptors to attatch the tokem to eevery request if in storage
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const data = await authStorage.getUserData();
      const token = data?.token;
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
export const registerUser = async (userData: RegisterPayload) => {
  const response = await apiClient.post("/api/register", userData);
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  console.log("[API] Login attempt for:", email);

  try {
    const response = await apiClient.post("/auth/login", { email, password });

    console.log("[API] Login response:", {
      status: response.data.status,
      message: response.data.message,
      hasToken: !!response.data.token,
      hasUserId: !!response.data.userId,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("[API] Backend error response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      console.error("[API] Login error:", error);

      if (error.response?.data) {
        console.log("[API] Error response from backend:", error.response.data);
        return error.response.data;
      }

      return {
        status: "error",
        message:
          error.message || "Network error - please check your connection",
      };
    }
  }
};
export const logoutUser = async () => {
  await authStorage.clearUserData();
};
export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get("/api/profile");
  console.log("response for user profile", response.data);
  if (!userId) {
    throw new Error("User ID is required to fetch profile");
  }
  return response.data;
};
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  },
);
export default apiClient;
