//const getDataFromJSON = require("../getDataFromJSON");
const requireOption = require("../requireOption");
// Betölti az edukációs intézmény listát.
module.exports = (objectRepository) => {
    const eduModel = requireOption(objectRepository, "eduM");

    return async (req, res, next) => {
        try {
            const eduList = await eduModel.find({});
            if (typeof eduList === 'undefined') {
                throw "Edu model/getEduListMW problem..."
            }
            res.locals.eduList = eduList;
            return next();
        } catch (err) {
            return next(err);
        }
    };
    
};