// Multer
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/media/3d/models/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const fileFilter = (req, file, cb) => {

    const ext = path.extname(file.originalname);
    if (ext !== '.gltf' && ext !== '.glb') {
      return cb(new Error('Only GLTF (.gltf) and GLB (.glb) files are allowed!'), false);
    }

    cb(null, true);
  };

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

// Middlewares
//const getAdminListMW = require('../middleware/admin/getAdminListMW');
const saveHomeDataMW = require('../middleware/home/saveHomeDataMW');

const getWorkMW = require('../middleware/work-exp/getWorkMW');
const saveWorkMW = require('../middleware/work-exp/saveWorkMW');
const delWorkMW = require('../middleware/work-exp/delWorkMW');

const getEduMW = require('../middleware/edu/getEduMW');
const saveEduMW = require('../middleware/edu/saveEduMW');
const delEduMW = require('../middleware/edu/delEduMW');


const getWorkListMW = require('../middleware/work-exp/getWorkListMW');
const getEduListMW = require('../middleware/edu/getEduListMW');
const getHomeDataMW = require('../middleware/home/getHomeDataMW');

const renderMW = require('../middleware/renderMW');

// Models
const eduM = require('../models/eduM');
const profileM = require('../models/profileM');
const work_expM = require('../models/work_expM');

module.exports = (app) => {
    const objectRepository = {
        eduM: eduM,
        profileM: profileM,
        work_expM: work_expM
    }

/* Admin sites */
// Admin / Home [Edit]
app.use(
    '/admin/home_edit',
    getHomeDataMW(objectRepository),
    saveHomeDataMW(objectRepository),
    renderMW(objectRepository, 'adm_home')
);

// Admin / Work Experienece [New]
app.use(
    '/admin/work_exp_new',
    upload.single('d3_modell_inp'),
    getHomeDataMW(objectRepository),
    saveWorkMW(objectRepository),
    renderMW(objectRepository, 'adm_work')
);
// Admin / Work Experienece [Edit]
app.use(
    '/admin/work_exp_edit/:work_id',
    upload.single('d3_modell_inp'),
    getHomeDataMW(objectRepository),
    getWorkMW(objectRepository),
    saveWorkMW(objectRepository),
    renderMW(objectRepository, 'adm_work')
);
// Admin / Work Experienece [Delete]
app.get(
    '/admin/work_exp_del/:work_id',
    delWorkMW(objectRepository)
)


// Admin / Education [New]
app.use(
    '/admin/edu_new',
    upload.single('d3_modell_inp'),
    getHomeDataMW(objectRepository),
    saveEduMW(objectRepository),
    renderMW(objectRepository, 'adm_edu')
);
// Admin / Education [Edit]
app.use(
    '/admin/edu_edit/:edu_id',
    upload.single('d3_modell_inp'),
    getHomeDataMW(objectRepository),
    getEduMW(objectRepository),
    saveEduMW(objectRepository),
    renderMW(objectRepository, 'adm_edu')
);
// Admin / Education [Delete]
app.get(
    '/admin/edu_del/:edu_id',
    delEduMW(objectRepository)
);


// Admin
app.get(
    '/admin',
    getHomeDataMW(objectRepository),
    getWorkListMW(objectRepository),
    getEduListMW(objectRepository),
    renderMW(objectRepository, 'admin')
);



/* User sites */
// Work Experience
app.get(
    '/workexperience',
    getHomeDataMW(objectRepository),
    getWorkListMW(objectRepository),
    renderMW(objectRepository, 'work-exp')
);
// Education
app.get(
    '/education',
    getHomeDataMW(objectRepository),
    getEduListMW(objectRepository),
    renderMW(objectRepository, 'education')
);
// Home
app.get(
    '/',
    getHomeDataMW(objectRepository),
    renderMW(objectRepository, 'index')
);
};