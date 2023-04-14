import express from "express";
import {getPlansByUser, createPlan, deletePlan} from "../controllers/plan.js";
const router = express.Router()

router.get("/userPlan/:username", getPlansByUser)
router.post("/plans/:id", createPlan)
router.delete("/userPlan/:username/:id", deletePlan)

export {router}