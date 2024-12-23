import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading post details...</p>;
  }
  return (
    <div
      style={{ backgroundColor: "#fef2f2", minHeight: "100vh" }}
      className="flex justify-center items-center py-10"
    >
      <div
        className="w-full max-w-6xl bg-white p-12 shadow-lg rounded-xl"
        style={{ minHeight: "500px" }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          {post.title}
        </h2>
        <div className="w-full flex justify-center mb-6">
          <img
            src={post.blogImage}
            alt={post.title}
            className="rounded-lg shadow-lg object-cover w-full  max-w-5xl h-96"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">{post.about}</p>
            <p className="text-sm text-gray-500 mt-4">
              Category: <span className="font-medium">{post.category}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewPost;
