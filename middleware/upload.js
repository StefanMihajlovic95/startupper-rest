const util = require("util");
const multer = require("multer");
const maxSize = 2 * 2048 * 2048;
var fs = require('fs');
var dir = './tmp';

function checkForFolderCreateIfNotExistsAndSaveFile(req, cb) {
    if (!fs.existsSync(__basedir + '/resources/uploads/' + req.params.folder + '/' + req.params.subfolder)) {
        fs.mkdirSync(__basedir + '/resources/uploads/' + req.params.folder + '/' + req.params.subfolder);
        cb(null, __basedir + '/resources/uploads/' + req.params.folder + '/' + req.params.subfolder);
    } else {
        cb(null, __basedir + '/resources/uploads/' + req.params.folder + '/' + req.params.subfolder);
    }
};

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(__basedir + '/resources/uploads/' + req.params.folder)) {
            fs.mkdirSync(__basedir + '/resources/uploads/' + req.params.folder);
            checkForFolderCreateIfNotExistsAndSaveFile(req, cb)
        } else {
            checkForFolderCreateIfNotExistsAndSaveFile(req, cb)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize},
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
