const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const commentsModel = require('../models/commentsModel');
const postsModel = require('../models/postsModel');
const { commentsValidation } = require('../validations/commentsValidation');

// create comment
router.post('/comments', async (req, res) => {

    //validate comment
    const { error } = commentsValidation(req.body);
    if (error) return res.status(400).send({
        status: "error",
        message: error.details[0].message
    });

    //validate Objectid
    if (!ObjectId.isValid(req.body.post_id)) return res.status(400).send({
        status: "error",
        message: "Invalid Post Id."
    });

    //check post exists
    const post = await postsModel.findOne({ _id: req.body.post_id });
    if (!post) return res.status(400).send({
        status: "error",
        message: "Post cannot found."
    });

    const comment = new commentsModel({
        post_id: req.body.post_id,
        name: req.body.name,
        url: req.body.url,
        comment: req.body.comment
    });
    try {
        const newComment = await comment.save();
        res.status(200).send({
            status: "success",
            results: newComment
        })
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error
        })
    }
});

//get comments by post id
router.get('/comments/:post_id', async (req, res) => {

    //validate Objectid
    if (!ObjectId.isValid(req.params.post_id)) return res.status(400).send({
        status: "error",
        message: "Invalid Post Id."
    });

    const comments = await commentsModel.find({ post_id: req.params.post_id });
    if (comments.length == 0) {
        res.status(200).send({
            status: "success",
            results: "Not found"
        })
    } else {
        res.status(200).send({
            status: "success",
            results: comments
        })
    }

});

module.exports = router;