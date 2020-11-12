const express = require('express');
const router = express.Router();


const postController = require('../Controllers/PostController');

//Page
router.get('/', postController.baseRoute);

router.get('/create', postController.createPage);

//function
router.post('/doCreate', postController.createPost);

router.get('/getPosts', postController.getPosts);

router.get('/getPost/:id', postController.getSinglePost);

router.put('/post/:id/update', postController.updatePost);

router.delete('/post/:id/delete', postController.deletePost);


module.exports = router;