const delInstMW = require('./Middlewares/Education/delInstMW');
const getInstDataMW = require('./Middlewares/Education/getInstDataMW');
const getInstDataFromUserMW = require('./Middlewares/Education/getInstDataFromUserMW');
const saveInstDataMW = require('./Middlewares/Education/saveInstDataMW');

const getNameAndProfileTextMW = require('./Middlewares/Profile/getNameAndProfileTextMW');
const getNameOrProfileChangesMW = require('./Middlewares/Profile/getNameOrProfileChangesMW');
const saveNameAndProfileChangesMW = require('./Middlewares/Profile/saveNameAndProfileChangesMW');

const renderMW = require('./Middlewares/Renderers/renderMW');

const delWorkExpMW = require('./Middlewares/Workexperience/delWorkExpMW');
const getWorkExpListMW = require('./Middlewares/Workexperience/getWorkExpListMW');
const getWorkExpDataMW = require('./Middlewares/Workexperience/getWorkExpDataMW');
const saveWorkExpListMW = require('./Middlewares/Workexperience/saveWorkExpListMW');

module.exports = (app) => {
    const objectRepository = {
        taskModel: taskModel,
        commentModel: commentModel
    };


// Profile:
app.get(
    '/',
    getNameAndProfileTextMW(objectRepository),
    renderMW(objectRepository, 'index.html')
);

app.get(
    '/profileadmin',
    getNameAndProfileTextMW(objectRepository),
    renderMW(objectRepository, 'profadm.html')
);

app.use(
    '/profileadmin/edit',
    getNameOrProfileChangesMW(objectRepository),
    saveNameAndProfileChangesMW(objectRepository),
    renderMW(objectRepository, 'profadm.html')
);
  


// Work experience:
app.get(
    '/workexperience',
    getWorkExplistMW(objectRepository),
    renderMW(objectRepository, 'workexp.html')
);
  
app.get(
    '/workexperienceadmin',
    getWorkExplistMW(objectRepository),
    renderMW(objectRepository, 'workexpadm.html')
);

app.use(
    '/workexperienceadmin/new',
    getWorkExplistMW(objectRepository),
    saveWorkExpListMW(objectRepository),
    renderMW(objectRepository, 'workexpadm.html')
);

app.use(
    '/workexperienceadmin/edit/:workplaceid',
    getWorkExpDataMW(objectRepository),
    saveWorkExpListMW(objectRepository),
    renderMW(objectRepository, 'workexpadm.html')
);

app.get(
    '/workexperienceadmin/delete/:workplaceid',
    getWorkExpListMW(objectRepository),
    delWorkExpMW(objectRepository)
);



// Education:
app.get(
    '/education',
    getInstDataMW(objectRepository),
    renderMW(objectRepository, 'edu.html')
);
  
app.get(
    '/educationadmin',
    getInstDataMW(objectRepository),
    renderMW(objectRepository, 'eduadm.html')
);

app.use(
    '/educationadmin/new',
    getInstDataMW(objectRepository),
    saveInstDataMW(objectRepository),
    renderMW(objectRepository, 'eduadm.html')
);

app.use(
    '/educationadmin/edit/:institutionid',
    getInstDataFromUserMW(objectRepository),
    saveInstDataMW(objectRepository),
    renderMW(objectRepository, 'eduadm.html')
);

app.get(
    '/educationadmin/delete/:institutionid',
    getInstDataMW(objectRepository),
    delInstMW(objectRepository)
);
};