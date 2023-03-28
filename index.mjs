import express from "express";



const app = express();
const port = 3000;

app.get("/",(req, res) => {
    res.send("Hello and Welcome");
});


app.use(express.static("static"));

console.log(process.env.NODE_ENV);


app.get("/",(req, res) => {
    res.render("index")
});
app.get("/gallery", (req, res) => {
    res.render("gallery")
});



app.listen(port, () => {
    console.log(`server running on port ${port}`);
});