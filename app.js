const express = require('express');
const morgan = require('morgan');
const redis = require('redis');
const app = express();
let client = redis.createClient(6379,'127.0.0.1');

app.use(morgan('combined'));
app.use(function(req,res,next){
    req.cache = client;
    next();
});
app.post('/profile',function(req,res,next){
    req.accepts('application/json');
    var key = req.body.name;
    var value = JSON.stringify(req.body);
    req.cache.set(key,value,function(err,data){
         if(err){
               console.log(err);
               res.send("error "+err);
               return;
         }
         req.cache.expire(key,10);
         res.json(value);
         //console.log(value);
    });
})
app.get('/profile/:name',function(req,res,next){
    var key = req.params.name; 
    req.cache.get(key,function(err,data){
         if(err){
               console.log(err);
               res.send("error "+err);
               return;
         }
         var value = JSON.parse(data);
         res.json(value);
    });
});

app.listen(3000,()=>{
    console.log("port 3000")
})