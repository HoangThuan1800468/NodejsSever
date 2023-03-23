import { UserModel } from "../models/UsersModels.js";
import bcrypt from "bcrypt"; //hash password
import Jwt  from "jsonwebtoken";

export const getUsers = async (req,res) => {                    // api lấy tất cả post
    try{
        const users = await UserModel.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({error:err});
    }
};
export const deleteUser = async (req,res) => {                    // api lấy tất cả post
    try{
        const idUser  = req.params.id;
        const deleteUser = await UserModel.deleteOne({_id: idUser});
        res.status(200).json(deleteUser);
    }catch(err){
        res.status(500).json({error:err});
    }
};
export const createUser = async (req,res) => {                  // api tạo post mới 
    try{
        const bcryptPass = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, bcryptPass);

        // const newUser = req.body;
        const newUser = {
            username: req.body.username,
            password: hashed,
            email: req.body.email,
        }
        const user = new UserModel(newUser);
        await user.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json({error:err});
    }
};

// ACCESS TOKEN
export const generateAccessToken = (user) => {
    return Jwt.sign({
        id: user.id,
        admin: user.admin
    },
    process.env.JWT_ACCESS_KEY,
    {expiresIn: '60s' }
    );
}
// // REFRESH TOKEN
export const generateRefreshToken = (user) => {
    return Jwt.sign({
        id: user.id,
        admin: user.admin
    },
    process.env.JWT_REFRESH_KEY,
    {expiresIn: '30d' }
    );
}
    

export const loginUser = async (req,res) => {                  // api tạo post mới 
    try{
        const user = await UserModel.findOne({username: req.body.username});
        if(!user){
            res.status(404).json("No user");
        }else{
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                res.status(404).json("wrong pass");
            }
            if(user && validPassword){

                const accestoken = generateRefreshToken(user);

                const refreshToken = generateRefreshToken(user);

                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,
                    secure:false,
                    path:'/',
                    sameSite:"strict",
                });

                const {password, ...others}=user._doc;
                res.status(200).json({...others,accestoken});
            }
        }
        
    }catch(err){
        res.status(500).json({error:err});
    }
};

export const requestRefresToken = async (req,res) => {     
    const resrefreshToken = req.cookies.refreshToken;
    res.status(200).json(resrefreshToken);
};
