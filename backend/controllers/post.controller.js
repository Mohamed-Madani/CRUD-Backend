const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts);
}

module.exports.setPosts = async (req, res) => {
if(!req.body.message){
res.json({message: "message is required"})
}

const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
})

res.status(200).json(post);
}

module.exports.editPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

if(!post){
    res.status(400).json({message: "Post not found"})
}

await post.remove();
    res.status(200).json({ message: "Post deleted" });
}


module.exports.deletePost = async (req, res) => {
const post = await PostModel.findById(req.params.id);

if(!post){
res.status(400).json({message: "Post not found"})
}

const removePost = await post.deleteOne();
res.status(200).send({message: "Post deleted" + removePost});
}


