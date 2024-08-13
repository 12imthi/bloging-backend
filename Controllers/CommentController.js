import Comment from "../Models/commentSchema.js";


export const postComments = async(req,res) => {

    // console.log(req.body);

    try {
        
        const newComment = new Comment(req.body)
        await newComment.save()

        res.status(202).json({message: "Comment created successfully",comment : newComment})


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error postComments" });
    }
}

export const totalComments = async(req,res) => {
    try {

        const totalComments = await Comment.countDocuments({})
        res.status(200).json({message:'Total comments count',totalComments})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error allComments" });
    }

}