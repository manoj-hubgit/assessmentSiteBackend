import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    collectionName:{type: String, required: true},
    questionText: { type: String, required: true},
    options: { type: [String], required: true},
    correctAnswer:{ type:String, required: true},
    password:{type:String, required:true},
})

const Question= mongoose.model("Question", questionSchema);

export default Question;