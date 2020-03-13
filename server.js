const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path =require('path');
const sequelize = require('./models').sequelize;
const User = require('./models').User;
sequelize.sync();

app.use(bodyParser.json());
app.use(morgan('combined'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',function(req,res){
    res.render('index', {title:"Hey",message:"Hello"});
});

app.post('/profile',function(req,res,next){
    
})
app.get('/profile/:name',async(req,res,next)=>{
    const users = await User.findAll({
        where:["name like ?", "\"%"+req.params.name+"%\""]
    });
    res.send(users);
});

app.listen(3001,()=>{
    console.log("port 3001")
})
