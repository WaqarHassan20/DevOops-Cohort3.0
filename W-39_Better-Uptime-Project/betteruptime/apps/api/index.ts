import express from "express"
const app = express();


app.post("/website", (req, res) => {});
app.post("/status:websiteId", (req, res) => {});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on the port ", process.env.PORT || 3000);
});