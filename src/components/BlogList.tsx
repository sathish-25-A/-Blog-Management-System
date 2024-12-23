import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, deleteBlog } from "../api/blogApi";
import { Blog } from "../types/Blog";
import './BlogList.css'; // Import the CSS file

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBlog(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="blog-list">
      <h1>Blog List</h1>
      <Link to="/create">
        <button>Create New Blog</button>
      </Link>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* View Button */}
              <Link to={`/blogs/${blog.id}`}>
                <button>View</button>
              </Link>
              {/* Update Button */}
              <Link to={`/edit/${blog.id}`}>
                <button>Update</button>
              </Link>
              {/* Delete Button */}
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
