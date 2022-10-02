import axios from "./axios";
import { User } from "../types";

export const getUser = async () => {
  return axios.get(`user/getUser`);
};

export const updateUser = async (user: User) => {
  return axios.post(`user/updateUser`, user);
};
