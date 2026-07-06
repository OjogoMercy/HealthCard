import { jwtDecode } from "jwt-decode";
export interface DecodedToken {
  exp: number;
  iat: number;
  userId?: string;
  email?: string;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.warn("[TokenUtils] Failed to decode token:", error);
    return true;
  }
};

export const getTokenExpiration = (token: string): Date | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
};

export const isTokenAboutToExpire = (
  token: string,
  bufferSeconds: number = 300,
): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime < bufferSeconds;
  } catch (error) {
    return true;
  }
};
