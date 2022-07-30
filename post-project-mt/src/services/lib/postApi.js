import { publicAxiosClient } from "../apiClient";

export const getPosts = () => {
  return publicAxiosClient.get("/posts");
};

export const getPost = (id) => {
  return publicAxiosClient.get(`/posts/${id}`);
};

export const createPost = (data) => {
  return publicAxiosClient.post(`/posts/add`, data);
};

export const updatePost = (id,data) => {
  return publicAxiosClient.put(`/posts/${id}`, data);
};

export const getPostComment = (id) => {
  return publicAxiosClient.get(`/posts/${id}/comments`);
};

export const deletePost = (id) => {
  return publicAxiosClient.delete(`/posts/${id}`);
};

export const getComments = (id) => {
  return publicAxiosClient.delete(`/posts/${id}`);
};