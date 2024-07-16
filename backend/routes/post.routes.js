const express = require("express");
const { setPosts, getPosts, editPost, deletePost, likePost } = require("../controllers/post.controller");
const router = express.Router();

//route pour les posts
router.get("/", getPosts);

    //route pour les posts
router.post("/", setPosts);

    //route pour les update
router.put("/:id", editPost);

    //route pour les delete
router.delete("/:id", deletePost);

    //route pour les likes
// router.patch("/like-post/:id", likePost);

//     //route pour les dislikes
// router.patch("/dislike-post/:id", (req, res) =>{
//         res.json({message: "Post dislike id:" + req.params.id})
//     });



module.exports = router;