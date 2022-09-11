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

export function verifyEmail(email: string, verifyHash: string) {
  return axios.post("auth/verifyEmail", { email, verifyHash });
}

export function sendResetPasswordEmail(email: string) {
  return axios.post("auth/sendResetPasswordEmail", { email });
}

export function resetPassword(
  email: string,
  verifyHash: string,
  password: string
) {
  return axios.post("auth/resetPassword", {
    email,
    verifyHash,
    password,
  });
}
