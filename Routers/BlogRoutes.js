import express from "express"
import { createBlog, deletePost, getBlogs, getById, relatedPost, updatePostById } from "../Controllers/BlogController.js";
import verifyToken from "../Middleware/verifyToken.js";
import isAdmin from '../Middleware/isAdmin.js';



const router = express.Router();

router.post("/create-post",verifyToken,isAdmin,createBlog)

router.get('/',getBlogs)

router.get('/:id', getById)

router.patch('/update-post/:id',verifyToken,isAdmin,updatePostById)

router.delete('/delete-post/:id',verifyToken,isAdmin,deletePost)

router.get('/related/:id',relatedPost)



export default router;