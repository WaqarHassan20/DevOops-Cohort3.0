import express from "express"
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello World from Home page");
})

app.get("/cpu",(req,res)=>{

    for (let i = 0; i < 1000000000; i++) {
        Math.random();
    }

    res.send("Hello World , this is CPU intensive task");
})


app.listen(3000,()=>{
    console.log("Server is running on the port 3000");
})