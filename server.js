const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/studentportalapp'));

app.get('/*',(req,res)=>{
    res.sendFile('index.html',{root:'dist/studentportalapp'})
});

app.listen(process.env.PORT || 8080);