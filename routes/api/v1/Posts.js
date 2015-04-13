var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Get the model
var post = mongoose.model('Post');

// GET /api/v1/posts - GET ALL
router.get('/', function (req, res) {
    post.find({}, function (err, posts) {
        res.json(posts);
    });
});

// GET /api/v1/posts/:post_id
router.get('/:post_id', function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) res.send(err);

        res.json(post);
    });
});

// POST /api/v1/posts
router.post('/', function(req, res) {
    var newPost = new Post();
    newPost.title = req.body.title;
    newPost.body = req.body.body;
    newPost.author = req.body.author;
    newPost.published = req.body.published;

    newPost.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Post created!' });
    });
});

// PUT /api/v1/posts
router.put('/', function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err) res.send(err);

        post.title = req.body.title;
        post.body = req.body.body;
        post.author = req.body.author;
        post.published = req.body.published;
        post.meta.favs = req.body.favs;
        post.meta.dvotes = req.body.dvotes;
        post.meta.uvotes = req.body.uvotes;

        post.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'Post updated' });
        });
    });
});

// DELETE /api/v1/posts/:post_id
router.delete('/:post_id', function(req, res) { 
    Post.findByIdAndRemove(req.params.post_id, function(err, post) {
        if (err) res.send(err);

        res.json({ message: 'Post deleted!' });
    });
});

module.exports = router;