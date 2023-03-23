import Jwt from "jsonwebtoken";


    
    export const verifyToken = (req,res,next) =>{
        const token = req.headers.token;
        if(token){
            Jwt.verify(token,process.env.JWT_ACCESS_KEY,(err,user) => {
                if(err){
                    res.status(403).json("Token is not valid!");
                }else{
                    res.user = user;
                    next();
                }
                
            })
        }else{
            res.status(401).json("Y're not authencated");
        }
    } 

    export const verifyTokenAndAdminAuth = (req,res,next) => {
        const token = req.headers.token;
        const idParams  = req.params.id;
        if(token){
            Jwt.verify(token,process.env.JWT_ACCESS_KEY,(err,user) => {
                if(err){
                    res.status(403).json("Token is not valid!");
                }else{
                    res.user = user;
                    const idUser = res.user.id;
                    const adminStatus = res.user.admin;
                    if(idUser == idParams || adminStatus){
                        next();
                    }else{
                        res.status(403).json("Y're not allowed to delete!");
                    }
                }   
            });
        }else{
            res.status(401).json("Y're not authencated");
        }
    }

