import axios from "axios";
import type { CreateChat, CreateUserRequest, GetChat, LogingUserRequest } from "../types/dataTypes";

const BASE_URL: string = "http://localhost:5000";

export const signupUser = async (payload: CreateUserRequest) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/user/regiseter`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("create use error", error);
    throw error;
  }
};

export const loginUser = async (payload: LogingUserRequest) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/user/login`,
      payload,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("login user error", error);
    throw error;
  }
};

export const isUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/user/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("get user type data", error);
    throw error;
  }
};

export const getAlluser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("get all users", error);
    throw error;
  }
};

export const createChat = async (data: CreateChat) => {
  const { currentUserId, targetUserId } = data;
  try {
    const response = await axios.post(`${BASE_URL}/api/chat/create`, {
      currentUserId,
      targetUserId,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChat = async (data: GetChat) => {
  try {
    const { userId } = data;
    const response = await axios.post(`${BASE_URL}/api/chat/get`, {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
