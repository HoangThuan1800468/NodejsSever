import express from "express";
import { getPosts,createPost,updatePost,getPost } from "../controllers/posts.js"; //  api CRUD

const router = express.Router();

// cấu hình gọi router từ url 
router.get('/',getPosts);
router.get(`/:id`,getPost);
router.post('/',createPost);
router.post(`/updatePost/:id`,updatePost);

export default router;