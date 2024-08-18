import mongoose from "mongoose";
import Blog from "../Models/blogSchema.js";
import Comment from "../Models/commentSchema.js";

export const createBlog = async (req, res) => {
  try {
    // console.log("blogs start : ",req.body);
    const newPost = new Blog({ ...req.body ,author: req.userId}); // use author: req.userId, when you have token 
    await newPost.save();
    res.status(201).json({
      message: "post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating post" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    let query = {};

    // Search by title or content using regex
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Match exact category (can be changed to regex for partial match)
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Match exact location (can be changed to regex for partial match)
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const blogs = await Blog.find(query).populate('author', 'email').sort({ createdAt: -1 });

    res.status(200).json({
      message: "All posts retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};


export const getById = async (req, res) => {
  try {
    // console.log(req.params.id);

    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

const comments = await Comment.find({postId : postId}).populate('user',"username email")

    res
      .status(202)
      .send({  post,comments});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching singel  post" });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "post not found" });
    }
    res
      .status(202)
      .json({ message: "updated post successfully", data: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updated  post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletePost = await Blog.findByIdAndDelete(postId);
    if (!deletePost) {
      return res.status(404).json({ message: "post not found" });
    }

    // delete related comments

await Comment.deleteMany({postId : postId})

    res
      .status(202)
      .json({ message: "Deleted post successfully", data: deletePost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleted  post" });
  }
};

export const relatedPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: "Post Id is required",
      });
    }
    const blog = await Blog.findById(id)

    if (!blog) {
        return res.status(404).json({
          message: "Post is not found ",
        });
      }

      const titelRegex = new RegExp(blog.title.split(' ').join('|'),'i')

      const relatedQuery = {
        _id: {$ne: id} ,// exclude the current blog by id
        title: {$regex : titelRegex}
      }

      const relatedPost =  await Blog.find(relatedQuery)

      res.status(202).send(relatedPost)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error RelatedPost  post" });
  }
};
