import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;

app.set("view engine", "pug");

app.use(express.static("static"));

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

/*app.get("/", (req, res) => {
  res.send("index");
})*/

app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.send(rows);
  });
});

//console.log(process.env.NODE_ENV);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
