import axios from "axios";
import { UserRegistration, AuthData } from "../types/authorization";

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
    
    return(response.data)
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
};

export const authUser = async (authData: AuthData) => {
  try {
    const response = await api.post("/auth/signin", authData);
    
    console.log(response)

    return(response.data)
    // console.log(response.data)
  } catch (error) {
    console.error("Ошибка при отправке данных:", error)
  }
}