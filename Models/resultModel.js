import mongoose from "mongoose";

const resultSchema= new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId,ref : "User", required:true},
    collectionName: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
})

const Result =mongoose.model("Result",resultSchema);
export default Result;