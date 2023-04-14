import express from "express";
import {addProgress, getProgressByUser} from "../controllers/planProgress.js";
const router = express.Router()

router.get("/progress/:username", getProgressByUser)
router.post("/progress/:id", addProgress)

export {router}