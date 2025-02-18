import Result from "../Models/resultModel.js";

export const storeResult = async (req,res)=>{
    const { userId, collectionName, score, totalQuestions } = req.body;
    if (!userId || !collectionName || score === undefined || !totalQuestions) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newResult = new Result({ userId, collectionName, score, totalQuestions });
        await newResult.save();
        res.status(201).json({ message: "Result stored successfully", result: newResult });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllResults = async (req, res) => {
    try {
        const results = await Result.find().populate('userId', 'email').sort({ timestamp: -1 }); 
        res.status(200).json({ message: "All results retrieved", results });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

