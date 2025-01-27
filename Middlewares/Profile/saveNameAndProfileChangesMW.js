// Elmenti a profil változtatásait, ha nincs mit menteni, akkor next()-el.
module.exports = (objectRepository) => {

    return (req, res, next) => {
        return next();
    };
};