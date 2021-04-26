const express = require("express");
const router = require('./Router/router')
const app = express();
const port = 2021;
const mongoose = require('mongoose');
const bp = require('body-parser');
app.use(bp.urlencoded({extended:true}));
app.use(bp.json())
app.use('/api',router)
mongoose.connect('mongodb+srv://shashi:shashi@cluster0.gbwvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false}).then(success=>{
    console.log("mongoDB atlas connected")
    app.listen(port,()=>{
      console.log(`server running at ${port}`)
    })
}).catch(error=>{
    console.log(error)
})