import axios from "./axios";

export const getReviewLibraryList = async () => {
  return axios.get(`library/libraryList`);
};

export const getOneReviewLibraryDataWithId = async (libraryId: string) => {
  return axios.get(`library/libraryOne/${libraryId}`);
};

export const createReviewLibrary = async (payload: any) => {
  return axios.post("library/librarySave", payload);
};
export const editReviewLibrary = async (payload: any, id: string) => {
  return axios.put(`library/libraryEdit/${id}`, payload);
};
export const deleteReviewLibrary = async (id: string) => {
  return axios.delete(`library/libraryDelete/${id}`);
};
