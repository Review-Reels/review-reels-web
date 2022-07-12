import { S3_URL, WEB_APP_URL } from "../constants/ApiUrls";

export const getUrl = (url: string | undefined): string => {
  return `${S3_URL}${url}`;
};

export const getWebUrl = (url: string): string => {
  return `${WEB_APP_URL}${url}`;
};
