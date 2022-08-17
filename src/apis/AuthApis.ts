import { googleSignUpPayload, signInPayload, signUpPayload } from "../types";

import axios from "./axios";

export function googleSignIn(payload: googleSignUpPayload | undefined) {
  return axios.post("auth/google_sign_in", payload);
}

export function emailSignIn(payload: signInPayload | undefined) {
  return axios.post("auth/signin", payload);
}

export function emailSignup(payload: signUpPayload | undefined) {
  return axios.post("auth/signup", payload);
}
