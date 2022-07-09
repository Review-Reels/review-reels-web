/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  NotFound: undefined;
  Login: undefined;
  ReviewRequest: undefined;
  ReviewDetails: { id: number };
  Home: undefined;
  ShareRequest: undefined;
  ViewRequest: { merchant: string };
  SubmitSuccess: { merchantName: string };
  Loading: undefined;
  SendEmails: undefined;
  PublishReview: undefined;
  ReviewResponseDetails: { reviewRequest: any; reviewResponse: any };
  Subscription: undefined;
  Profile: undefined;
  EmailSignIn: undefined;
  EmailSignUp: undefined;
};

export type TextInputProps = {
  placeholder?: string;
  value?: string | undefined;
  error?: string;
  label?: string;
  onChangeText: Function;
  onSubmitEditing?: undefined;
  disabled?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  ref?: any;
  password?: boolean;
};

export type ButtonProps = {
  title: string;
  onPress: Function;
  isDisabled?: boolean;
  mode?: string;
  icon?: string;
};

export type CameraProps = {
  isOpen: boolean;
  onClose: Function;
  onCapture: Function;
};

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
  askMessages: [AskMessage] | [];
}
