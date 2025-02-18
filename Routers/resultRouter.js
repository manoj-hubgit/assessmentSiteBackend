import express from "express";
import { getAllResults, storeResult } from "../Controllers/resultController.js";


const router = express.Router();

router.post("/store",storeResult);
router.get("/getAllResult",getAllResults);

export default router;