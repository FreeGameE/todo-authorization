import axios from "axios";
import { UserRegistration, AuthData, ProfileRequest } from "../types/auth";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  withCredentials: true,
});

export const newUser = async (registrationData: UserRegistration) => {
  try {
    const response = await api.post("/auth/signup", registrationData);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const authUser = async (authData: AuthData) => {
  try {
    const response = await api.post("/auth/signin", authData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("user/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
  } catch (error) {
    console.error("Ошибка запроса:", error);
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await api.post("/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const putUserProfile = async (changedUserData: ProfileRequest) => {
  try {
    await api.put("/user/profile", changedUserData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error: any) {
    throw error;
  }
};
