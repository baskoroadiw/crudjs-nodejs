const mongoose = require("mongoose");

//create posts schema
const PostsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    desc: {
        type: String
    }
});

module.exports = mongoose.model('posts', PostsSchema);