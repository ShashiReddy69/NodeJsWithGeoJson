// Router/router.js
// api routes
const express = require('express');
const router = express.Router();
const UserController=require('../Controller/userData');
router.post('/usersData',UserController.usersData);
router.get('/getData',UserController.getUsersData);
// search data api with params
router.post('/search/:longitude&:latitude',UserController.getDataByParams);
//search data api without params(from body)
router.post('/search',UserController.getDataByParams)
router.put('/updateDataById/:id',UserController.updateDataById);
router.delete('/deleteDataById/:id',UserController.deleteData)
module.exports=router;