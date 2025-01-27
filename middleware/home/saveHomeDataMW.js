const requireOption = require("../requireOption");
// Elmenti a profil változtatásait, ha nincs mit menteni, akkor next()-el.
module.exports = (objectRepository) => {

    return (req, res, next) => {
        
        if (typeof req.body.name_inp === 'undefined' || typeof req.body.info_inp === 'undefined') { return next(); }

        if (req.body.name_inp === "") {
            res.locals.errNameMissing = true;
            console.log("ERROR: missing name");
        } else {
            res.locals.errNameMissing = false;
        }

        if (req.body.info_inp === "") {
            res.locals.errInfoMissing = true;
            console.log("ERROR: missing info");
        } else {
            res.locals.errInfoMissing = false;
        }

        if (res.locals.errNameMissing === true || res.locals.errInfoMissing === true) {
            return next();
        }

        res.locals.profile[0].name = req.body.name_inp;
        res.locals.profile[0].info = req.body.info_inp;

        
        res.locals.profile[0].save();

       return res.redirect('/admin');
    };
};