const requireOption = require("../requireOption");

// Lista elemet töröl az edukációs intézmény listából ha nincsen több elem, akkor csak next()-el.
module.exports = (objectRepository) => {
    const eduModel = requireOption(objectRepository, "eduM");

    return async (req, res, next) => {
        try {
            const eduItem = await eduModel.findByIdAndDelete(req.params.edu_id);
            if (typeof eduItem.highest_title === 'undefined') {
                throw "Edu model/delEduMW problem..."
            }

            return res.redirect('/admin');
        } catch (err) {
            return next(err);
        }
    };
};