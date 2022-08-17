/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type SignupPayload = {
  username: string;
  email: string;
  name: string;
  id?: string;
  givenName?: string;
  familyName?: string;
  photoUrl?: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
};

export type googleSignUpPayload = {
  idToken?: string;
};

export type signInPayload = {
  email: string;
  password: string;
};
export type signUpPayload = {
  email: string;
  password: string;
  name: string;
  username: string;
  merchantName: string;
};

export type updateUserPayload = {
  username: string;
  merchantName: string;
};

export type sendEmailPayload = {
  subject: string;
  sendTo: Array<{ email: string; customerName: string }>;
  reviewRequestId: string;
};

export type AskMessage = {
  id: string;
  createdAt: string;
  name: string;
  askMessage: string;
  imageUrl: string;
  size: number;
  updatedAt: string;
  userId: string;
  videoUrl: string;
};

export interface AskMessages {
  askMessages: AskMessage[] | [];
}

export type ReviewResponse = {
  id: string;
  replyMessage: string;
  customerName: string;
  whatYouDo: string;
  imageUrl: string;
  videoUrl: string;
  size: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  requestMessageId: string;
  EmailTracker: [];
};

export interface UpdateIsRead {
  isRead: boolean;
}

export type User = {
  authType: string;
  createdAt: string;
  email: string;
  id: string;
  merchantName: string;
  name: string;
  username: string;
  password?: string;
  emailVerified: boolean;
  Authorization?: string;
  picture?: string;
};
