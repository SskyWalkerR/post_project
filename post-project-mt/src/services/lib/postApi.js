import { publicAxiosClient } from "../apiClient";

export const getPosts = () => {
  return publicAxiosClient.get("/posts");
};

export const getPost = (id) => {
  return publicAxiosClient.get(`/posts/${id}`);
};

export const getPostComment = (id) => {
  return publicAxiosClient.get(`/posts/${id}/comments`);
};
