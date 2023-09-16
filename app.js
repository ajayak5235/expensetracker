const path = require('path')
const express = require('express');

const bodyParser = require('body-parser');
const sequelize = require('./util/database')
const app = express();

app.use(bodyParser.json({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/getAll' ,(req, res)=>{
res.sendFile(path.join(__dirname,'public','exp.html'))
})

sequelize
.sync()
.then(result =>{
    console.log(result)
    app.listen(3000)
})
.catch(err =>{
    console.log(err)
})

