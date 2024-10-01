import express from "express";
import {
  createBlog,
  deletePost,
  getBlogs,
  getById,
  relatedPost,
  updatePostById,
  getUserPosts
} from "../Controllers/BlogController.js";
import verifyToken from "../Middleware/verifyToken.js";

const router = express.Router();

// Routes for both users and admins
router.post("/create-post",verifyToken, createBlog);
router.patch('/update-post/:id', verifyToken, updatePostById);
router.delete('/delete-post/:id', verifyToken, deletePost);
router.get('/user-posts', verifyToken, getUserPosts);

// Public routes
router.get('/', getBlogs);
router.get('/:id', getById);
router.get('/related/:id', relatedPost);


export default router;
