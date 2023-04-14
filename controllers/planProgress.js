import planProgressModel from "../models/planProgress.js"

const addProgress = async (req, res, next) => {
    try {
        const plans = await planProgressModel.insertMany([req.body]);
        return res.json(plans);
    } catch (ex) {
        next(ex);
    }
};

const getProgressByUser = async (req, res, next) => {
    try {
        const plans = await planProgressModel.find({username: req.params.username});
        return res.json(plans)
    } catch (ex) {
        next(ex);
    }
};

export{addProgress, getProgressByUser}
