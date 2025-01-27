const requireOption = require("../requireOption");
// Betöli az adott munkahely elemet.
module.exports = (objectRepository) => {
    const work_expModel = requireOption(objectRepository, "work_expM");

    return async (req, res, next) => {
        try {
            const work_expItem = await work_expModel.findById(req.params.work_id);
            if (typeof work_expItem.position_name === 'undefined') {
                throw "Work-Exp model/getWorkMW problem..."
            }
            res.locals.work_expItem = work_expItem;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};