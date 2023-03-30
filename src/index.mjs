import express from "express";
import mysql from "mysql2";

/*const express = require("express");
const mysql = require("mysql2");*/

//console.log("change");
const app = express();
const port = 3000;

app.set("view engine", "pug");

app.use(express.static("static"));

console.log(process.env.NODE_ENV);

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

app.get("/", (req, res) => {
  res.render("index");
});

/*app.get("/", (req, res) => {
  res.send("index");
})*/

/*app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.send(rows);
  });
});*/

app.get("/cities", async (req, res) => {
  try{
    const [rows, fields] = await db.execute("SELECT * FROM `city`");
    return res.render("cities", {rows, fields});
  } catch (err) {
    console.error(err);
  }
  });

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/api/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `city`");
  return res.render(rows);

});

app.get("/about", (req, res) => {
  res.render("about", {title: "Boring"});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
