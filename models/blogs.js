const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Mongoose automatically looks for the plural, lowercased version of your model name

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;