// APIClient.ts
import axios from "axios";
import authStorage from "./authStorage";

const BASE_URL = "https://backend-healthCard.onrender.com";
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

export interface LoginResponse {
  userName?: string;
  status: "success" | "error";
  message: string;
  token?: string;
  userId?: string;
}

let logoutHandler: (() => void) | null = null;

export const registerLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
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

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const data = await authStorage.getUserData();
      const token = data?.token;

      if (token && config.headers) {
        if (isTokenExpired(token)) {
          if (logoutHandler) {
            logoutHandler();
          }
          return Promise.reject(new Error("Token expired"));
        }
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

export const registerUser = async (userData: RegisterPayload) => {
  try {
    const response = await apiClient.post("/api/register", userData);
    console.log("User successfully registered");
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log("Backend error message");
      return error.response.data;
    }
    throw new Error(error.message || "Registration Failed");
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/api/login", { email, password });
    console.log("[API] Login success!");
    return response.data;
  } catch (error: any) {
    console.error("[API] Login error:", error);

    if (error.response?.data) {
      console.log("[API] Backend error response:", error.response.data);
      return error.response.data;
    }

    return {
      status: "error",
      message: error.message || "Network error - please check your connection",
    };
  }
};
export const logoutUser = () => {
  if (logoutHandler) {
    logoutHandler();
  } else {
    console.warn("[apiClient] No logout handler registered yet");
  }
};

export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get("/api/profile");
  console.log("response for user profile", response.data);
  if (!userId) {
    throw new Error("User ID is required to fetch profile");
  }
  return response.data;
};

export const createChild = async (
  name: string,
  dateOfBirth: Date,
  gender: string,
) => {
  const response = await apiClient.post("/api/children", {
    name,
    dateOfBirth,
    gender,
  });
  console.log("child created successfully");
  return response.data;
};

export const getChildren = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required to fetch profile");
  }
  const response = await apiClient.get(`/api/children`);
  return response.data;
};

export const getGrowthRecords = async (childId: string, userId: string) => {
  if (!childId || !userId) {
    throw new Error(
      "Child ID and User ID are required to fetch growth records",
    );
  }
  const response = await apiClient.get(
    `api/children/${childId}/growth-records`,
  );
  return response.data;
};

export const createImmunisation = async ({
  vaccineId,
  dueDate,
  childId,
  userId,
}: {
  vaccineId: string;
  dueDate: Date;
  childId: string;
  userId: string;
}) => {
  console.log("Creating immunisation record");
  if (!userId || !childId) {
    throw new Error("User ID and Child ID are required to create immunisation");
  }
  const response = await apiClient.post("/api/immunisations", {
    vaccineId,
    dueDate,
    childId,
    userId,
  });
  return response.data;
};

export const deleteImmunisation = async (immunisationId: string) => {
  const response = await apiClient.delete(
    `/api/immunisations/${immunisationId}`,
  );
  return response.data;
};

export const getImmunisationsByChild = async (
  childId: string,
  userId: string,
) => {
  if (!childId || !userId) {
    throw new Error(" ID is required to fetch immunisations");
  }
  const response = await apiClient.get(`/api/children/immunisations`);
  return response.data;
};

export const updateImmunisation = async (
  immunisationId: string,
  userId: string,
  data: { administered: boolean },
) => {
  if (!userId) {
    throw new Error("User ID is required to update immunisation");
  }
  const response = await apiClient.patch(
    `/api/immunisations/${immunisationId}`,
    data,
  );
  return response.data;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && logoutHandler) {
      logoutHandler();
    }
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
