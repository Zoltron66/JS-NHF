// Elmenti az editálás változtatásait és az újonnan létrehozott elemeket, he nincs mit elmenteni, akkor csak next()-el.
module.exports = (objectRepository) => {

    return (req, res, next) => {
        return next();
    };
};