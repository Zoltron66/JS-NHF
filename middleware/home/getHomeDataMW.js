//const getDataFromJSON = require("../getDataFromJSON");
const requireOption = require("../requireOption");
const createDefaultHome = require("../createDefault");

// Betölti az oldal szerzőjének a nevét és a bemutatkozását.
module.exports = (objectRepository) => {
    const profileModel = requireOption(objectRepository, "profileM");

    return async (req, res, next) => {
        try {
            const profile = await profileModel.find({});
            if (typeof profile[0] === 'undefined') {
                throw "Nem volt alapertelmezett Home adat, mar van, frissitsd az oldat a tovabblepeshez!";
            }
            res.locals.profile = profile;
            res.locals.ownerName = profile[0].name;
            res.locals.ownerInfo = profile[0].info;
            return next();
        } catch (err) {
            createDefaultHome(profileModel);
            return next(err);
        }
    };
};