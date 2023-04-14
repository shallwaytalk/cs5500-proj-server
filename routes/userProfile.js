import express from "express";
import {
    createUserProfile,
    getAllUserProfiles,
    getUserProfileByUserName,
    setUserProfile
} from "../controllers/userProfile.js";
const router = express.Router()

router.get("/userProfile", getAllUserProfiles)
router.get("/userProfile/:username", getUserProfileByUserName)
router.post("/userProfile/:username", setUserProfile)
router.post("/userProfile", createUserProfile)
export {router}