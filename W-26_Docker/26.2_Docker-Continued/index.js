const express = require("express");
const app = express();

app.get("/",(req,res)=>{
	res.send("Hello world this is optimized docker image");
})


app.listen(3000,()=>{
	console.log("Server is listening on the port 3000");
})