const PostModel = require("../models/post.model");


module.exports.getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        return res.status(200).json({message: "Posts retrieved", posts});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error getting posts" });
    }
}

module.exports.setPosts = async (req, res) => {
    if (!req.body.message) {
      return res.status(400).json({ message: "Message is required" });
    }
  
    try {
      const post = await PostModel.create({
        message: req.body.message,
        author: req.body.author,
      });
  
      return res.status(201).json({ message: "Post created", post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error creating post" });
    }
  };
  

  module.exports.editPost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      return res.status(200).json({ message: "Post updated", updatedPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error updating post" });
    }
  };
  


  module.exports.deletePost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error deleting post" });
    }
  };
  


