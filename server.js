const express = require("express");
const app = express();

app.get("/submit",(req,res)=>{
    res.send("success");
});
app.listen("8080",()=>{
    console.log("succes");
})