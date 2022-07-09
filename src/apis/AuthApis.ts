import { googleSignUpPayload } from "../types";

import axios from "./axios";

export function googleSignIn(payload: googleSignUpPayload | undefined) {
  return axios.post("auth/google_sign_in", payload);
}
