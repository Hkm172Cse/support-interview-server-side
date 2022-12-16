const express = require('express');
const port = process.env.PORT ||  5000;


const app = express();

app.get('/', (req,res)=>{
    res.send(`servier is runing on the ${port} number port`);
});
app.listen(port,(res,req)=>{
    console.log(`sever is running on port ${port}`);
});