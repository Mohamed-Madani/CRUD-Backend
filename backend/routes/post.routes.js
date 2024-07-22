const express = require("express");
const { setPosts, getPosts, editPost, deletePost, likePost } = require("../controllers/post.controller");
const router = express.Router();

//route pour les posts
router.get("/posts", getPosts);

    //route pour les posts
router.post("/post/new-post", setPosts);

    //route pour les update
router.put("/post/update-post/:id", editPost);

    //route pour les delete
router.delete("/post/delete-post/:id", deletePost);


module.exports = router;