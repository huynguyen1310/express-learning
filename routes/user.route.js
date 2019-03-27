const express = require('express');
const multer = require('multer');

const userController = require('../controllers/user.controller');
const userValidate = require('../validate/user.validate');
var upload = multer({ dest: './public/uploads/' });

const router = express.Router();
router.get('/', userController.index);

router.get('/search',userController.search);

router.get('/create',userController.getCreate);

router.get('/:id',userController.view)

router.post('/create',upload.single('avatar'),userValidate.postCreateValidate,userController.postCreate);



module.exports = router; 