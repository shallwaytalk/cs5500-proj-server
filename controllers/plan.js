import planModel from "../models/plan.js"

const getPlansByUser = async (req, res, next) => {
    try {
        const plans = await planModel.find({username: req.params.username});
        return res.json(plans);
    } catch (ex) {
        next(ex);
    }
};

const createPlan = async (req, res, next) => {
    try {
        const plan = await planModel.insertMany(
            [req.body]
        );
        return res.json(plan);
    } catch (ex) {
        next(ex);
    }
};

const deletePlan = async (req, res, next) => {
    try {
        await planModel.deleteOne(
            {id: req.params.id}
        );
        return res.status(200).send();
    } catch (ex) {
        next(ex);
    }
}

export {getPlansByUser, createPlan, deletePlan}