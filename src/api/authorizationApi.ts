import axios from "axios";

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordRequest {
  password: string;
}

export interface Token {
  access: string;
  refresh: string;
}

const api = axios.create({
  baseURL: "https://easydev.club/api/v2",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export const accountRegistration = async (registrationData: UserRegistration) => {
  try {
    await api.post("/auth/signup", registrationData);
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
};
