import express from "express";
import { getUsers,createUser,loginUser,deleteUser,requestRefresToken } from "../controllers/auths.js"; //  api CRUD
import {verifyTokenAndAdminAuth,verifyToken} from "../controllers/middlewareControllers.js"
const router = express.Router();

// cấu hình gọi router từ url 
router.get('/',verifyToken,getUsers);
router.delete(`/deleteUser/:id`,verifyTokenAndAdminAuth,deleteUser);
router.post('/register',createUser);
router.post('/loginUser',loginUser);
router.get('/requestToken',requestRefresToken);
export default router;