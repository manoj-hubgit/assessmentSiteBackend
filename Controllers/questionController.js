import Question from "../Models/questionSchema.js";


export const addQuestion = async (req, res) => {
  const { collectionName, password, questionText, options, correctAnswer } =
    req.body;
  if (
    !collectionName ||
    !password ||
    !questionText ||
    !options ||
    !correctAnswer ||
    options.length !== 4
  ) {
    return res.status(400).json({ message: "All Fields are Required" });
  }
  if (!options.includes(correctAnswer)) {
    return res
      .status(400)
      .json({ message: "Correct answer must be one of the options." });
  }

  try {
    const question = new Question({
      collectionName,
      password,
      questionText,
      options,
      correctAnswer,
    });
    await question.save();
    res.status(200).json({ message: "Question added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getQuestionByCollection= async(req,res)=>{
    const {password} = req.body;
    if(!password){
        return res.status(400).json({ message: "Password is required." });
    }
    try {
        const questions= await Question.find({password});
        if(questions.length===0){
            return res.status(404).json({message:"No questions found for the given password."})
        }
        res.status(200).json({message:"questions retrived successfully",questions:questions})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getAllCollectionNames= async(req,res)=>{
    try {
        const collections = await Question.distinct("collectionName");
        if (collections.length === 0) {
          return res.status(404).json({ message: "No collections found." });
        }
        res.status(200).json({collections:collections})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const verifyPasskey = async (req, res) => {
  const { passkey } = req.body;
  try {
    const collection = await Question.findOne({ password: passkey });
    if (!collection) {
      return res.status(400).json({ success: false, message: "Invalid Passkey" });
    }

    const collectionName = collection.collectionName;
    const questions = await Question.find({ collectionName });

    res.status(200).json({ success: true, collectionName, questions });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteCollection = async (req, res) => {
  const { collectionName } = req.params;

  try {
      const deletedQuestions = await Question.deleteMany({ collectionName });
      if (deletedQuestions.deletedCount === 0) {
          return res.status(400).json({ message: "Collection not found" });
      }
      res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};
