const uploadFile = require("../middleware/upload");
var fs = require('fs');

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({message: "Please upload a file!"});
        }

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 4MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/uploads/" + req.params.folder + '/' + req.params.subfolder;

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(404).send({
                message: "No files!",
            });
        } else {

            let fileInfos = [];

            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: 'http://localhost:3000/' + "resources/uploads/" + req.params.folder + '/' + req.params.subfolder + '/' + file,
                });
            });

            res.status(200).send(fileInfos);
        }
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/uploads/" + req.params.folder + '/' + req.params.subfolder + '/' + fileName;

    res.download(directoryPath, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

const deleteFiles = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/uploads/" + req.params.folder + '/' + req.params.subfolder + '/' + fileName;
    fs.unlink(directoryPath, (err) => {
        if (err) throw err;
        res.status(200).send({
            message: "File successfully deleted",
        });
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
    deleteFiles
};
