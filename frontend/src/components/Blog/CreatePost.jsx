import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ fetchPosts }) => {
  const [postData, setPostData] = useState({
    title: "",
    blogImage: "",
    about: "", 
    category: "", // New field for category of the blog
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: files[0], // Set the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("about", postData.about);
    formData.append("category", postData.category);
    formData.append("blogImage", postData.blogImage); 


    console.log("Form Data:", formData);

    const token = localStorage.getItem("token");
    console.log("Token:", token);
    try {
      const response = await axios.post("http://localhost:8080/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          "Authorization": `Bearer ${token}`,
        },
      });
      alert("Post created successfully");
     
      fetchPosts();
      navigate("/get-posts"); 
     
    } catch (error) {
      console.error("Error creating post", error);
     
    }
  };

  return (
    <div className="p-8" style={{ backgroundColor: "#fef2f2" }}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-600 font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black" // Set text color to black
            required
          />
        </div>

        {/* Image Upload Field */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium" htmlFor="blogImage">
            Blog Image
          </label>
          <input
            type="file"
            id="blogImage"
            name="blogImage"
            onChange={handleFileChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        {/* About Field */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium" htmlFor="about">
            About (Short Description)
          </label>
          <textarea
            id="about"
            name="about"
            value={postData.about}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={postData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

const BlogCard = ({ title, blogImage, about, category }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    <img src={blogImage} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
    <h3 className="text-xl font-bold mt-4">{title}</h3>
    <p className="text-gray-600 mt-2">{about}</p>
    <p className="text-sm text-gray-400 mt-2">Category: {category}</p>
  </div>
);

export default CreatePost;
