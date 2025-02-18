import express from "express";
import { addQuestion, deleteCollection, getAllCollectionNames, getQuestionByCollection,verifyPasskey } from "../Controllers/questionController.js";

const router= express.Router();

router.post("/addQuestion",addQuestion);
router.post("/getQuestion",getQuestionByCollection);
router.get("/collectionsName",getAllCollectionNames);
router.post("/verify-passkey",verifyPasskey);
router.delete("/deleteCollection/:collectionName",deleteCollection);

export default router;
