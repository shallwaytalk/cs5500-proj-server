import userModel from "../models/userProfile.js"

const getAllUserProfiles = async (req, res, next) => {
    try {
        const userProfile = await userModel.find({});
        return res.json(userProfile);
    } catch (ex) {
        next(ex);
    }
};

const getUserProfileByUserName = async (req, res, next) => {
    try {
        const userProfile = await userModel.findOne({username: req.params.username});
        return res.json(userProfile);
    } catch (ex) {
        next(ex);
    }
}

const setUserProfile = async (req, res, next) => {
    try {
        const newData = {$set: req.body}
        const userData = await userModel.updateOne(
            {username: req.params.username},
            newData
        );
        return res.json(userData);
    } catch (ex) {
        next(ex);
    }
}

const createUserProfile = async (req, res, next) => {
    try {
        const profile = await userModel.insertMany(
            [req.body]
        );
        return res.json(profile);
    } catch (ex) {
        next(ex);
    }
};
export {getAllUserProfiles, getUserProfileByUserName, setUserProfile, createUserProfile};