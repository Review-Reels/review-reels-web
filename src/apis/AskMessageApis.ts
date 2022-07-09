// import { googleSignUpPayload } from "../types";

import axios from "./axios";

export const getReviewRequest = async () => {
  return axios.get(`review/reviewRequest`);
};
