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
    options.length > 2
  ) {
    return res.status(400), json({ message: "All Fields are Required" });
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
        res.status(200).json({collections:collections})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// export const getQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res
//       .status(200)
//       .json({
//         message: "Questions retrived Successfully",
//         questions: questions,
//       });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, options, correctAnswer } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionText, options, correctAnswer },
      { new: text }
    );

    if (!updateQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res
      .status(200)
      .json({ message: "Question updated successfully", updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuestion = await Question.findByIdAndDelete(id);
    if (!deleteQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
