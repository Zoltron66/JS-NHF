// Elmenti a munkatapasztalatokon esetlegesen közölt változtatásokat, ha nincs mit menteni, akkor egyszerűen csak next()-el;
module.exports = (objectRepository) => {

    return (req, res, next) => {
        return next();
    };
};