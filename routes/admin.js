'use strict'

var express = require('express');
var AdminController = require('../controllers/admin');


var router = express.Router(); //disponible el router

var multipart = require('connect-multiparty');
var md_uploadd= multipart({uploadDir: './upload/users'});



router.post('/login-admin', AdminController.loginUserAdmin);


router.put('/update-user/:id', AdminController.setadmin);
router.post('/compararPassword/:id', AdminController.comparePassword);
router.put('/update-password/:id', AdminController.updatePassword);


router.post('/upload-image-user/:id',/* [md_auth.ensureAuth,*/ md_uploadd, AdminController.uploadImage);
router.get('/get-image-user/:imageFile', AdminController.getImageFile);
router.delete('/delete-image/:id', md_uploadd, AdminController.deleteImageFile);

module.exports = router;