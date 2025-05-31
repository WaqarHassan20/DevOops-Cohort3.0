const express = require("express");
const app = express();

app.get("/",(req,res)=>{
	res.send("Hello, Testing File for Docker Classes");
})


app.listen(3000,()=>{
	console.log("Server is listening on the port 3000");
})

console.log("DATABASE URL = ",process.env.DATABASE_URL);