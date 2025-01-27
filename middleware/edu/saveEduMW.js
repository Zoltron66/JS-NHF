const requireOption = require("../requireOption");
const set3DModelName = require("../set3DModelName");
// Elmenti az editálás változtatásait és az újonnan létrehozott elemet, ha nincs mit elmenteni, akkor csak next()-el.
module.exports = (objectRepository) => {
    const eduModel = requireOption(objectRepository, "eduM");

    return (req, res, next) => {
        
        if (
            typeof req.body.edu_name_e_inp === 'undefined' ||
            typeof req.body.inst_name_e_inp === 'undefined' ||
            typeof req.body.inst_loc_e_inp === 'undefined' ||
            typeof req.body.date_e_inp === 'undefined'
        ) { return next(); }

        if (req.body.edu_name_e_inp === "") {
            res.locals.errEduNameMissing = true;
            console.log("ERROR: missing educational title");
        } else { res.locals.errEduNameMissing = false; }

        if (req.body.inst_name_e_inp === "") {
            res.locals.errEduInstMissing = true;
            console.log("ERROR: missing institution name");
        } else { res.locals.errEduInstMissing = false; }

        if (req.body.inst_loc_e_inp === "") {
            res.locals.errInstLocMissing = true;
            console.log("ERROR: missing inst loc");
        } else { res.locals.errInstLocMissing = false; }

        if (req.body.date_e_inp === "") {
            res.locals.errEDateMissing = true;
            console.log("ERROR: missing edu date");
        } else { res.locals.errEDateMissing = false; }


        if (res.locals.errEduNameMissing === true || 
            res.locals.errEduInstMissing === true ||
            res.locals.errInstLocMissing === true ||
            res.locals.errEDateMissing === true 
        ) { return next(); }


        if (typeof res.locals.eduItem === 'undefined') {
            res.locals.eduItem = new eduModel();
        }

        res.locals.eduItem.d3_model_name = set3DModelName(req.file, res.locals.eduItem.d3_model_name);
        

        res.locals.eduItem.highest_title = req.body.edu_name_e_inp;
        res.locals.eduItem.institution_name = req.body.inst_name_e_inp;
        res.locals.eduItem.institution_location = req.body.inst_loc_e_inp;
        res.locals.eduItem.date = req.body.date_e_inp;

        res.locals.eduItem.save();

        return res.redirect('/admin');
    };
};