const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "private/ebooks")
    },

    filename: (req, file, cb) => {

        const fileName = uuidv4() + '_' + file.originalname.replace(/\//g, '_') // only for windows
        cb(null, fileName)
    }
});

const fileFilter = (req, file, cb) => {

    const type = file.mimetype;

    if (type === "application/pdf") {

        cb(null, true);

    } else {

        return cb(null, false);

    }
}

const uploadPdf = multer({

    storage: storage,
    fileFilter
});

module.exports = uploadPdf;