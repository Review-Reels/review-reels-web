import { UpdateIsRead } from "../types";

import axios from "./axios";

export const getReviewResponse = async (
  requestId: string,
  searchValue?: string
) => {
  return axios.get(
    `review/reviewResponse?requestId=${requestId}&searchValue=${searchValue}`
  );
};

export const getEmbedReviewResponse = async (responseId: string) => {
  return axios.get(`review/embedReviewResponse?responseId=${responseId}`);
};

export const getUnReadStatistics = async () => {
  return axios.get(`review/unReadStatistics`);
};

export const getReviewResponseWithId = async (requestId: string) => {
  return axios.get(`review/reviewResponse/requestId=${requestId}`);
};

export const createReviewResponse = async (payload: FormData) => {
  return axios.post("review/reviewResponse", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateIsRead = async (payload: UpdateIsRead, id: string) => {
  return axios.put(`review/reviewResponse/${id}`, payload);
};

export const deleteReviewResponse = async (id: string) => {
  return axios.delete(`review/reviewResponse/${id}`);
};
