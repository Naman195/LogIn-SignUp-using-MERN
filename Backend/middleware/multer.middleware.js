import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/uploads") // file storage location
    },
    filename: function (req, file, cb)  {
        const uniquePrefix = Date.now()
        const myfilename = file.originalname.split(".").pop()
        cb(null, uniquePrefix + file.fieldname + "." + myfilename)
    }

})

export const upload = multer({ storage: storage })
