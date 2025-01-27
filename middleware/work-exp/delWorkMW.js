const requireOption = require("../requireOption");

// Kitörli a munkatapasztalatok listából a kijelölt munkahelyet, ha nincsen már több elem, akkor next()-el.
module.exports = (objectRepository) => {
    const work_expModel = requireOption(objectRepository, "work_expM");

    return async (req, res, next) => {
        try {
            const work_expItem = await work_expModel.findByIdAndDelete(req.params.work_id);
            if (typeof work_expItem.position_name === 'undefined') {
                throw "Work-Exp model/delWorkMW problem..."
            }
            
            return res.redirect('/admin');
        } catch (err) {
            return next(err);
        }
    };
};