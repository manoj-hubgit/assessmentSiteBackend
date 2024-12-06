import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser= async (req,res)=>{
    const {userName,email,password}=req.body;

    if(!userName || !email || !password || userName.trim()==="" || email.trim() === "" || password.trim() === ""){
        return res.status(400).json({message:"All field are Required"});
    }

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }
        const hashedPassword=bcryptjs.hashSync(password,10);
        const newUser = new User({userName,email,password:hashedPassword})
        await newUser.save();
        return res.status(200).json({message:"User registered successfully",user:newUser});
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(400).json({message:"Internal Server Error"});
    }
}

export const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }

        const userDetail = await User.findOne({email});
        if(!userDetail){
            return res.status(400).json({message:"User not Found"});
        }
        const passwordMatch= bcryptjs.compareSync(password,userDetail.password);
        if(!passwordMatch){
            return res.status(400).json({message:"Invalid credentials"}); 
        }
        const token = jwt.sign(
            {_id: userDetail._id,isAdmin:userDetail.isAdmin},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"1h"}
        );
        res.status(200).json({
            message:"Logged in successfully",
            token:token,
            user:userDetail,
        })
    } catch (error) {
        res.status(400).json({message:"Internal Server Error"});
    }
}