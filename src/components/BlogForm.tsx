import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog, createBlog, updateBlog } from "../api/blogApi";
import { Blog } from "../types/Blog";

const BlogForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog>({ id: 0, title: "", content: "" });

  useEffect(() => {
    if (id) {
      fetchBlog(Number(id));
    }
  }, [id]);

  const fetchBlog = async (id: number) => {
    try {
      const response = await getBlog(id);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await updateBlog(Number(id), blog); // Update blog
      } else {
        await createBlog(blog); // Create new blog
      }
      navigate("/"); // Redirect to blog list
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          required
        />
      </div>
      <button type="submit">{id ? "Update Blog" : "Create Blog"}</button>
    </form>
  );
};

export default BlogForm;
