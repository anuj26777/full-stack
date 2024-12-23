import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";


const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.data || []); // Ensure fallback to empty array if no data
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this blog?");
    if (userConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`); // Navigate to the edit page with the post ID
  };

  const handleView = (id) => {
    navigate(`/view-post/${id}`);
  }


  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="p-8" style={{ backgroundColor: "#fef2f2" }}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Posts</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded shadow-md overflow-hidden"
              style={{ border: "1px solid #ddd" }}
            >
              <BlogCard
                title={post.title}
                blogImage={post.blogImage || "https://via.placeholder.com/150"} // Fallback image if none is provided
                about={post.about || "No description available"}
                category={post.category || "Uncategorized"}
                onEdit={() => handleEdit(post._id)}
                onDelete={() => handleDelete(post._id)}
                onView={() => handleView(post._id)}
              />
             
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default GetAllPosts;
