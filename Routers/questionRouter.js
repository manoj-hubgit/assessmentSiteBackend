import express from "express";
import { addQuestion, deleteQuestion, getAllCollectionNames, getQuestionByCollection, updateQuestion } from "../Controllers/questionController.js";

const router= express.Router();

router.post("/add",addQuestion);
router.post("/getQuestion",getQuestionByCollection);
router.get("/collectionsName",getAllCollectionNames);
router.put("updateQuestion/:id",updateQuestion);
router.delete("deleteQuestion/:id",deleteQuestion);

export default router;
