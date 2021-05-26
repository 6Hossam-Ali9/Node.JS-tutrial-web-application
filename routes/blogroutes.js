const express = require('express');
const Blog = require('../models/blogs.js');
const router = express.Router();



router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then(result => {
        res.render('index', { title: 'Home' , blogs: result }); 
        //We don't need to provide the place as ejs automatically use name folder views as the main folder
    }).catch(err => console.log(err));
});


router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then(() => res.redirect('/blogs')).catch(err => console.log(err));
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create new blog' });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result => {
        res.render('blog', { title: 'Blog', blog: result })
    }).catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id).then(() => {
        res.json({redirect: '/blogs'})
    }).catch(err => console.log(err));
});

module.exports = router;