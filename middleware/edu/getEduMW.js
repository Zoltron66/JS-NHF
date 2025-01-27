const requireOption = require("../requireOption");
// Betölti az adott edukációs intézmény elemet.
module.exports = (objectRepository) => {
    const eduModel = requireOption(objectRepository, "eduM");

    return async (req, res, next) => {
        try {
            const eduItem = await eduModel.findById(req.params.edu_id);
            if (typeof eduItem.highest_title === 'undefined') {
                throw "Edu model/getEduMW problem..."
            }
            res.locals.eduItem = eduItem;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};