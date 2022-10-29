const router = require('express').Router();
const postsModel = require('../models/postsModel');
const { postValidation } = require('../validations/postsValidation');
const multer = require('multer');

// multer configuration
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        req.fileValidationError = 1;
        cb(null, false, req.fileValidationError);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
        let extArray = file.mimetype.split("/");
        let extension = '.' + extArray[extArray.length - 1];
        newFileName = file.fieldname + '-' + uniqueSuffix + extension;
        cb(null, newFileName)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


// create post
router.post('/posts', upload.single('post_media'), async (req, res) => {

    //check uploaded file
    let filePath = null;
    if (req.file) {
        filePath = req.file.path.replace(/\\/g, '/')
    }

    // check file extension
    if (req.fileValidationError) return res.status(400).send({
        status: "error",
        message: "Unknown file type. Please try again."
    })



    //validate post
    const { error } = postValidation(req.body);
    if (error) return res.status(400).send({
        status: "error",
        message: error.details[0].message
    })



    const post = new postsModel({
        user_name: req.body.user_name,
        user_image_url: req.body.user_image_url,
        post_media: filePath,
        caption: req.body.caption
    });
    try {
        const newPost = await post.save();
        res.status(200).send({
            status: "success",
            results: newPost
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error
        })
    }
});

//get all posts
router.get('/posts', async (req, res) => {

    try {
        const posts = await postsModel.find();
        if (posts.length == 0) {
            res.status(200).send({
                status: "success",
                results: "Not found"
            })
        } else {
            res.status(200).send({
                status: "success",
                results: posts
            })
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error
        })
    }
});

//get post by id
router.get('/posts/:id', async (req, res) => {

    try {
        const post = await postsModel.findOne({ _id: req.params.id });
        if (post.length == 0) {
            res.status(200).send({
                status: "success",
                results: "Not found"
            })
        } else {
            res.status(200).send({
                status: "success",
                results: post
            })
        }

    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error
        })
    }
});

module.exports = router;