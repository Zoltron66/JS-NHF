module.exports = (Model) => {

    const output = new Model({
        name: "My Name",
        info: "Basic Information About Me."
    });
    
    output.save();
}