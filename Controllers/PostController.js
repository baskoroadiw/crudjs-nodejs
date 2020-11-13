const mongoose = require('mongoose');
const { head } = require('../Routes/PostRoutes');

const Posts = mongoose.model('posts');

const axios = require('axios').default;

//index page
exports.baseRoute = async (req, res) => {
    axios.get(process.env.BASE_URL+'/getPosts')
        .then((rest) => {
            const title = 'Crud.JS | Home';
            const header = 'Welcome to Crud.JS';
            const text = 'Crud.JS is website for CRUD operation using Express JS and use Mongo DB for database. This website created by Baskoro Adi';
            res.render('index', { title: title, header: header, text: text, data: rest.data, data_length: rest.data.length, baseurl: process.env.BASE_URL});
        }).catch(error => console.log(error));
}

exports.createPage = (req, res) => {
    res.render('create', { title: 'Crud.JS | Create', header: 'Create Posts', text: 'Please fill this form to create a new posts' });
}

exports.updatePage = async (req, res) => {
    let postID = req.params.id;
    axios.get(process.env.BASE_URL+'/getPost/'+postID)
        .then((rest) => {
            const title = 'Crud.JS | Edit';
            const header = 'Edit Posts';
            const text = 'Please fill this form to edit post';
            res.render('update', { title: title, header: header, text: text, data: rest.data.data, baseurl: process.env.BASE_URL });
        })
}

//function create post
exports.createPost = async (req, res) => {
    await new Posts(req.body).save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong.",
                error_message: err.name
            });
        }
        else {
            res.redirect('/');
        }
    });
}

//function get all post
exports.getPosts = async (req, res) => {
    const posts = await Posts.find();
    res.json(posts);
}

//function get single post
exports.getSinglePost = async (req, res) => {
    let postID = req.params.id;
    await Posts.findById({ _id: postID }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong.",
                error_message: err.name
            })
        }
        else {
            res.status(200).json({
                message: "Post Found",
                data,
            });
        }
    });
}

//function update data
exports.updatePost = async (req, res) => {
    let postID = req.params.id;
    await Posts.findByIdAndUpdate({ _id: postID }, { $set: req.body }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong.",
                error_message: err.name
            })
        }
        else {
            res.status(200).json({
                message: "Post Updated"
            });
        }
    });
}

//function delete data
exports.deletePost = async (req, res) => {
    let postID = req.params.id;
    await Posts.deleteOne({ _id: postID }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Something went wrong.",
                error_message: err.name
            })
        }
        else {
            res.status(200).json({
                message: "Post Deleted"
            });
        }
    });
}
