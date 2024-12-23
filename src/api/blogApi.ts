import axios from "axios";
import { Blog } from "../types/Blog";

const BASE_URL = "http://localhost:5000/blogs";

export const getBlogs = () => axios.get<Blog[]>(BASE_URL);
export const getBlog = (id: number) => axios.get<Blog>(`${BASE_URL}/${id}`);
export const createBlog = (blog: Blog) => axios.post<Blog>(BASE_URL, blog);
export const updateBlog = (id: number, blog: Blog) => axios.put<Blog>(`${BASE_URL}/${id}`, blog);
export const deleteBlog = (id: number) => axios.delete(`${BASE_URL}/${id}`);
