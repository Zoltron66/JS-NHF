const dataJSON = require("../public/scripts/data/app-data.json");
// Betölti a megfelelő tömböt a JSON fileból
const getDataFromJSON = (objArrayName) => {
    switch(objArrayName){
        case 'home':
            return dataJSON.about;

        case 'work-exp':
            return dataJSON.work_experience;

        case 'edu':
            return dataJSON.education;

        case 'admin':
            return dataJSON;
    }
}

module.exports = getDataFromJSON;