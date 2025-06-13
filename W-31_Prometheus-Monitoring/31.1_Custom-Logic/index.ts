import express from "express"
import { Middleware } from "./Middleware";
const app  = express()

app.use(Middleware);

app.get("/cpu",(req,res)=>{

    for (let i = 0; i < 1000000; i++) {
        Math.random();
    }
    
    res.json({
      message: "CPU endpoint",
    });
})
app.get("/users", (req, res) => {
    res.json({
      message: "Users endpoint",
    });
});

app.listen(3000,()=>{
    console.log("Server started listening on port 3000");
})
