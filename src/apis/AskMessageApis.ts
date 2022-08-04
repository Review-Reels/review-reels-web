import axios from "./axios";

export const getReviewRequest = async () => {
  return axios.get(`review/reviewRequest`);
};

export const getReviewRequestWithId = async (requestId: string) => {
  return axios.get(`review/reviewRequest/requestId=${requestId}`);
};

export const createReviewRequest = async (payload: FormData) => {
  return axios.post("review/reviewRequest", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteReviewRequest = async (id: string) => {
  return axios.delete(`review/reviewRequest/${id}`);
};
