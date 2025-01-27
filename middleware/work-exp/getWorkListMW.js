//const getDataFromJSON = require("../getDataFromJSON");
const requireOption = require("../requireOption");
// Betölti a munkatapasztalatok listát
module.exports = (objectRepository) => {
    const work_expModel = requireOption(objectRepository, "work_expM");

    return async (req, res, next) => {
        try {
            const work_expList = await work_expModel.find({});
            if (typeof work_expList === 'undefined') {
                throw "Work-Exp model/getWorkListMW problem..."
            }
            res.locals.workExpList = work_expList;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};