const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs.js');
//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://cx109:1234567890@nodetut.u8yh7.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    app.listen(3000);
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
}); //We should first connect to our database then start our website and as all of this is async we should
//put listen in the connect process

//view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); //Giving our page an accessable folder to use  
app.use(express.urlencoded({ extended: true }));   //We use this so we can use req.body method to get a data from a user

//Middleware is basically any code between the request and the response
// and we can do it by using app.use()

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'Adventure of a cat 2',
//         snippet: 'About the cat 2',
//         body: 'Cat 2 just likes to fight withe dogs.'
//     });

//     blog.save().then(result => res.send(result)).catch(err => console.log(err));
// });

// app.use((req,res,next) => {
//     console.log(req.url);
//    // console.log(req.method);
//     //console.log(res.statusCode); // don't know why it returns a wrong status

//     next(); // If we didn't invoke this next function our code will stop just right here like the one in the very below
// });

//This is a third party middleware
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
    //res.send('<h1>Home page</h1>');
    //res.sendFile('views/index.html', {root : __dirname});
});

app.get('/about', (req, res) => {
    //res.sendFile('views/about.html', { root : __dirname});
    res.render('about', { title: 'About' });
});
    

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then(result => {
        res.render('index', { title: 'Home' , blogs: result }); 
        //We don't need to provide the place as ejs automatically use name folder views as the main folder
    }).catch(err => console.log(err));
});


app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then(() => res.redirect('/blogs')).catch(err => console.log(err));
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog' });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result => {
        res.render('blog', { title: 'Blog', blog: result })
    }).catch(err => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id).then(() => {
        res.json({redirect: '/blogs'})
    }).catch(err => console.log(err));
});

//to handle 404 we can use (use method) as express works up to bottom when it reach use the 404 page is excuted
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});