import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { registerLogoutHandler } from "./APIClient";
import authStorage, { UserSession } from "./authStorage";

interface AuthContextType {
  session: UserSession | null;
  isLoading: boolean;
  loginAuth: (sessionData: UserSession) => Promise<void>;
  logoutAuth: () => Promise<void>;
  updateSession: (updates: Partial<UserSession>) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      setIsLoading(true);
      try {
        const storedSession = await authStorage.getUserData();
        if (storedSession) {
          setSession(storedSession);
        }
      } catch (error) {
        console.error("Failed to restore auth session on boot:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    registerLogoutHandler(logoutAuth);
  }, []);

  const loginAuth = async (sessionData: UserSession) => {
    try {
      await authStorage.storeUserData(sessionData);
      setSession(sessionData);
    } catch (error) {
      console.error("Error setting up user login session:", error);
      throw error;
    }
  };

  const logoutAuth = async () => {
    try {
      setSession(null);
      await authStorage.clearUserData();
    } catch (error) {
      console.error("Error clearing user session during logout:", error);
    } finally {
      setSession(null);
    }
  };

  const updateSession = async (updates: Partial<UserSession>) => {
    if (session) {
      const updatedSession = { ...session, ...updates };
      await authStorage.storeUserData(updatedSession);
      setSession(updatedSession);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, isLoading, loginAuth, logoutAuth, updateSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
