import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../api/blogApi";
import { Blog } from "../types/Blog";

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

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

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogPost;
