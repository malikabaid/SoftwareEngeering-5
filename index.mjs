import express from "express";
import mysql from "mysql2/promise"


const app = express();
const port = 3000;

app.get("/",(req, res) => {
    res.send("Hello and Welcome");
});
app.set("view engine", pug);

app.use(express.static("static"));

console.log(process.env.NODE_ENV);

const db = await mysql.createConnection({
    host:process.env.DATABASE_HOST || "localhost",
    user: "user",
    password: "password",
    database: "world",
})
app.get("/",(req, res) => {
    res.render("index")
});
app.get("/gallery", (req, res) => {
    res.render("gallery")
});



app.listen(port, () => {
    console.log(`server running on port ${port}`);
});