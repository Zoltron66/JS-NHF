module.exports = (file, fileName) => {
    if (!file) {
        if (typeof fileName === 'undefined' || fileName === "") {
            return "Default.gltf";
        } else { return fileName; }
    } else { return file.filename; }
};