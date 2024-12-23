import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-500 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Blog Dashboard</h2>
        <button
          className="mb-4 py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => navigate("/create-post")}
        >
          Create Post
        </button>
        <button
          className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => navigate("/get-posts")}
        >
          Get All Posts
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to the Blog Dashboard</h2>
        <p className="text-gray-600 mt-2">
          Use the sidebar to manage your blog posts: create, view, update, or delete them.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
