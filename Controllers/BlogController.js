import { trusted } from "mongoose";
import Blog from "../Models/blogSchema.js";

export const createBlog = async (req, res) => {
  try {
    // console.log("blogs start : ",req.body);
    const newPost = new Blog({ ...req.body });
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

export const getBlogs = async(req,res) => {

    try {

        const {search,category,location} = req.query;
        console.log(search);

        let query = {}

        if(search) {
            query = {
                ...query,
                $or : [
                    {title: {$regex: search, $options: "i"}},
                    {content: {$regex: search, $options: "i"}}
                ]
            }
        }

        if(category) {
            query = {
                ...query,
                category
            }
        }
        if(location) {
            query = {
                ...query,
                location
            }
        }

        const getBlogs = await Blog.find(query).sort({createdAt : -1});

        res.status(201).json({
            message:"All postes retervie successfully",
            data:getBlogs
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getBlogs post" });
    }
}


export const getById = async(req,res) => {
 
    try {
        // console.log(req.params.id);

        const postId = req.params.id;
        const post = await Blog.findById(postId);
        if(!post) {
            return res.status(404).json({message: "Post not found"})
        }

        // Todo : with also fetch comment realatd to the post
        res.status(202).json({message: "Post retrieved successfully",data:post})

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching singel  post" });
    }

}

export const updatePostById = async(req,res) => {
 try {

    const postId = req.params.id;
    const updatedPost  = await Blog.findByIdAndUpdate(postId,{
        ...req.body
    },{new : true});

    if(!updatedPost) {
        return res.status(404).json({message : "post not found"})
    }
    res.status(202).json({message: "updated post successfully",data:updatedPost})


 }
 catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updated  post" });
}
}

export const deletePost = async(req,res) => {
    try {

        const postId = req.params.id;
        const deletePost = await Blog.findByIdAndDelete(postId)
        if(!deletePost) {
            return res.status(404).json({message : "post not found"})
        }
        res.status(202).json({message: "Deleted post successfully",data:deletePost})

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleted  post" });
    }
}

export const relatedPost = async(req,res) => {

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error RelatedPost  post" });
    }
}