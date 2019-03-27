require('dotenv').config();

const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const multer = require('multer');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');

const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views' , './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index',{
        name : 'Huy'
    });
});

app.use('/users' , authMiddleware.requireAuth , userRoute);

app.use('/auth', authRoute);

app.use('/products', productRoute);

app.listen(port, ()=>{
    console.log(`port ${port} is working`);
});