import express from "express";
import mysql from "mysql2/promise";

/*const express = require("express");
const mysql = require("mysql2");*/

//console.log("change");
const app = express();
const port = 3000;

app.set("view engine", "pug");

app.use(express.static("static"));

console.log(process.env.NODE_ENV);

const db = await mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("index");
});

/*app.get("/", (req, res) => {
  res.send("index");
})*/
// For Cities
app.get("/", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.send(rows);
  });
});
// For countries
app.get("/", (req, res) => {
  db.execute("SELECT * FROM `country`", (err, rows, fields) => {
    console.log(`/country: ${rows.length} rows`);
    return res.send(rows);
  });
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});
app.get("/cities", async (req, res) => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM `city`");
    return res.render("cities", {rows, fields});
  } catch (err) {
    console.error(err);
  }
  });
  app.get("/api/cities", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM 'city'");
    return res.send(rows);
  });

  app.get("/countries", async (req, res) => {
    try {
      const [rows, fields] = await db.execute("SELECT * FROM `country`");
      return res.render("countries", {rows, fields});
    } catch (err) {
      console.error(err);
    }
    });
    app.get("/api/countries", async (req, res) => {
      const [rows, fields] = await db.execute("SELECT * FROM 'country'");
      return res.send(rows);
    });

/*app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM `city`");
  return res.render(rows);

});*/

app.get("/about", (req, res) => {
  res.render("about", {title: "Boring"});
});

/*app.get("/cities", async (req, res) => {
  const [rows, fields] = await db.getCities();
  return res.render("cities", { rows, fields });
});*/

/*app.get('/cities/:id', async (req, res) => {
  const cityId = req.params.id;
  const city = await db.getCity(cityId);
  return res.render('city', { city });
})*/

/*app.get("/api/cities", async (req, res) => {
  const [rows, fields] = await db.getCities();
  return res.send(rows);
});*/

app.get("/api/countries", async (req, res) => {
  const countries = await db.getCountries();
  res.send(countries);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
