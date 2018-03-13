import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_BLOG = 'CREATE_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOG = 'FETCH_BLOG';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const ROOT_URL = 'http://localhost:64804/api';
const API_KEY = '';

export function fetchPosts(id) {
 // console.log(id);
  const request = axios.get(`${ROOT_URL}/blogs/${id}${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload:  request
  };
};

export function createPost(props) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function createBlog(props) {
  const request = axios.post(`${ROOT_URL}/blogs${API_KEY}`, props);

  return {
    type: CREATE_BLOG,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: DELETE_POST,
    payload: request
  };
}

export function deleteBlog(id) {
  const request = axios.delete(`${ROOT_URL}/blogs/${id}`);

  return {
    type: DELETE_BLOG,
    payload: request
  };
}

export function deleteCategory(id) {
  const request = axios.delete(`${ROOT_URL}/categories/${id}`);

  return {
    type: DELETE_CATEGORY,
    payload: request
  };
}

export function fetchBlogs() {
  const request = axios.get(`${ROOT_URL}/blogs`);
  return {
    type: FETCH_BLOGS,
    payload: request
  };
};

export function fetchCategories() { 
  const request = axios.get(`${ROOT_URL}/categories`);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
};

export function fetchBlog(id) {
  const request = axios.get(`${ROOT_URL}/blogs/getblog/${id}`);
  return {
    type: FETCH_BLOG,
    payload: request
  };
};
