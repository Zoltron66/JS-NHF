// Kiküldi a usernek a megadott oldalt ("kirendereli neki")
module.exports = (objectRepository, page) => {
    
    return (req, res) => {
        res.end(`Rernder: ${page}`);
    };

};