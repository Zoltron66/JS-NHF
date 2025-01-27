const requireOption = require("./requireOption");
// Render Middleware (kiküldi a megadott viewt a megadott adatokkal)
module.exports = (objectrepository, viewName) => {
    return (req, res) => {
        res.render(viewName, {data: res.locals});
    };
};
