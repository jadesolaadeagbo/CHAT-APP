import jwt from "jsonwebtoken";
import { getUserById } from "../models/user.model.js";

const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token"});

        }

        const user = await getUserById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error:"User Not Found"});
        }

        req.user = user
        next();

    } catch (error) {
        console.log("Error in protect route middleware", error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}

export default protectRoute;