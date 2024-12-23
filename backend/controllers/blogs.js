const { Blog , createBlog , getBlogs} = require("../models/BlogModel");
const { validateBlog } = require("../utilis/validation");
const {getBaseUrl} = require("../utilis/helper");
const mongoose = require("mongoose");


const handleCreateBlog = async(req,res) => {
    const body = req.body;

    if(!validateBlog(body)) {
        return res.status(400).json({ status: 400, message: "Fill required fields" });
    }
    

    const photo = req.file;
    if (!photo) {
      return res.status(400).json({ status: 400, message: "No photo uploaded" });
    }

    const baseUrl = getBaseUrl();
    body.blogImage = `${baseUrl}/uploads/${photo.filename}`;
  

    try{
    const newUser = await createBlog(body);

    if(!newUser) {
        return res.status(400).json({ status:400 , message:"error occurred"})  
    }

    return res.status(200).json({ status:200 , message:"Blog created  successfully" , date: newUser});

  
  } catch (err) {
   
    return res.status(500).json({ status:500 , message:"Internal server error" ,err:err.message });
  }

}


const handleGetAllBlogs = async (req, res) => {
  try {
    const blogs = await getBlogs();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ status: 404, message: "No blogs found." });
    }

    const Blog = blogs.map((blog) => {
      const d = blog.toObject();
      delete d.__v;

      if (d.blogImage && !d.blogImage.startsWith("http")) {
        d.blogImage = `${getBaseUrl()}/${d.blogImage}`;
      }

      return d;
        
       
      
    });

    return res.status(200).json({ status: 200, message: "Blogs retrieved successfully", data: Blog });
  } catch (err) {
    return res.status(500).json({ status: 500, message: "Internal server error", err: err.message });
  }
};


const handleDeleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ status: 404, message: "Blog not found or already deleted." });
    }

    return res.status(200).json({ status: 200, message: "Blog deleted successfully", data: deletedBlog });
  } catch (err) {
    return res.status(500).json({ status: 500, message: "Internal server error", err: err.message });
  }
};



const handleUpdateBlog = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }




  try {



    if (req.file) {
      const photo = req.file;
      body.blogImage = `${getBaseUrl()}/uploads/${photo.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updatedBlog) {
      return res.status(404).json({ status: 404, message: "Blog not found or unable to update." });
    }

    return res.status(200).json({ status: 200, message: "Blog updated successfully", data: updatedBlog });
  } catch (err) {
    return res.status(500).json({ status: 500, message: "Internal server error", err: err.message });
  }
};



const handleGetBlogById = async (req, res) => {
  const { id } = req.params;



  try {
    

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ status: 404, message: "Blog not found." });
    }

    const blogData = blog.toObject();
    if (blogData.blogImage && !blogData.blogImage.startsWith("http")) {
      blogData.blogImage = `${getBaseUrl()}/${blogData.blogImage}`;
    }

    return res.status(200).json({ status: 200, message: "Blog retrieved successfully", data: blogData });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ status: 401, message: "Unauthorized. Invalid token." });
    }
    return res.status(500).json({ status: 500, message: "Internal server error", err: err.message });
  }
};






module.exports={
  handleCreateBlog,
  handleGetAllBlogs,
  handleDeleteBlog,
  handleUpdateBlog,
  handleGetBlogById
}