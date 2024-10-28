import hashPassword from "../helpers/encrypt.helper.js";
import {User, getUserByIdentifier} from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

export const signup = async(req, res) => {
    try {
        const { fullName, username,email, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match"})
        }

        const user = await getUserByIdentifier(email);

        //  Check if user exists
        if(user){
            return res.status(400).json({error:'This email is already assigned to a user'})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName, 
            username,
            email,
            password: await hashPassword(password),
            gender,
            profile: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            // Generate JWT Token
            generateTokenAndSetCookie(newUser,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profile       
            })
        } else{
            res.status(400).json({error:"Invalid user data"})
        }

    } catch(error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        const user = await getUserByIdentifier(username);

        if(!user){
            res.status(400).json({error: "Invalid  email or username"})
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if(!isPasswordCorrect){
            res.status(400).json({error: "Invalid  password"})
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            profilePic: user.profile       
        })

    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({error: "Internal Server Error" })
    }
}

export const logout = (res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0 });
        res.status(200).json({message: "Logged out successfully"})
    } catch(error){
        console.error("Error in logout controller:", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}
