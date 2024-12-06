import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/config.js";
import authRoute from "./Routers/authRouter.js";
import questionRoute from "./Routers/questionRouter.js";

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}));

const PORT=process.env.PORT;
connectDB();

app.use("/api/auth",authRoute);
app.use("/api/question",questionRoute);

app.get("/",(req,res)=>{
    res.send("Welcome to the Api");
})

app.listen(PORT,()=>{
    console.log("App is running in the port");
})