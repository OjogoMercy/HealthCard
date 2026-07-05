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
// endpoints for children
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

// endpoints for innumisation
export const createImmunisation = async (
  vaccineId: string,
  dueDate: Date,
  childId: string,
  userId: string,
) => {
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
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  },
);
export default apiClient;
