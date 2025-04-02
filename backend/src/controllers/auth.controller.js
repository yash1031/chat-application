// In Express.js, controllers are functions or classes that handle the logic for specific routes, separating request handling from route definitions, leading to more organized and maintainable code. 

// A controller in Express.js is a module or function that handles the logic when a route is called. Instead of writing all the logic inside the route definition, controllers allow you to offload that functionality to separate files. This structure ensures that your routing logic and request-handling logic are separate, leading to more readable, reusable, and testable code.


import { generateToken } from '../lib/utils.js';
import bcrypt from "bcryptjs"
import User from '../models/user.model.js'

export const signup= async (req, res)=>{
    const {fullName, email, password}= req.body
    try{
        if (!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }  
        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: "Email already exists"});

        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if(newUser){
            //generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const login= (req, res)=>{
    res.send("login route")
};

export const logout= (req, res)=>{
    res.send("logout route")
};