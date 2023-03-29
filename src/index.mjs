import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

app.get("/", (req, res) => {
  res.send("Hello and Welcome");
});

app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.send(rows);
  });
});

app.use(express.static("static"));

console.log(process.env.NODE_ENV);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
