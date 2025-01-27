const requireOption = require("../requireOption");
const set3DModelName = require("../set3DModelName");
// Elmenti a munkatapasztalatokon esetlegesen közölt változtatásokat, ha nincs mit menteni, akkor egyszerűen csak next()-el;
module.exports = (objectRepository) => {
    const work_expModel = requireOption(objectRepository, "work_expM");

    return (req, res, next) => {
            
        if (
            typeof req.body.pos_name_inp === 'undefined' ||
            typeof req.body.wp_name_inp === 'undefined' ||
            typeof req.body.date_inp === 'undefined' ||
            typeof req.body.about_inp === 'undefined'
        ) { return next(); }

        if (req.body.pos_name_inp === "") {
            res.locals.errPosNameMissing = true;
            console.log("ERROR: missing position name");
        } else { res.locals.errPosNameMissing = false; }

        if (req.body.wp_name_inp === "") {
            res.locals.errWpNameMissing = true;
            console.log("ERROR: missing business name");
        } else { res.locals.errWpNameMissing = false; }

        if (req.body.date_inp === "") {
            res.locals.errWDateMissing = true;
            console.log("ERROR: missing work date");
        } else { res.locals.errWDateMissing = false; }

        if (req.body.about_inp === "") {
            res.locals.errWAboutMissing = true;
            console.log("ERROR: missing work about");
        } else { res.locals.errWAboutMissing = false; }


        if (res.locals.errPosNameMissing === true || 
            res.locals.errWpNameMissing === true ||
            res.locals.errWDateMissing === true ||
            res.locals.errWAboutMissing === true 
        ) { return next(); }


        if (typeof res.locals.work_expItem === 'undefined') {
            res.locals.work_expItem = new work_expModel();
        }

        res.locals.work_expItem.d3_model_name = set3DModelName(req.file, res.locals.work_expItem.d3_model_name);
        

        res.locals.work_expItem.position_name = req.body.pos_name_inp;
        res.locals.work_expItem.business_name = req.body.wp_name_inp;
        res.locals.work_expItem.date = req.body.date_inp;
        res.locals.work_expItem.about = req.body.about_inp;

        res.locals.work_expItem.save();

        return res.redirect('/admin');
    };
};