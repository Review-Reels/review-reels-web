import { S3_URL } from "../constants/ApiUrls";

export const getUrl = (url: string): string => {
  return `${S3_URL}${url}`;
};
