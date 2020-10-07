//Dwpendancies:
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");
let notes = require("./db/db");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000; //should be 8000????

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public')); ///explain



// // Star Wars Characters (DATA)
// // =============================================================
// var characters = [
//   {
//     routeName: "yoda",
//     name: "Yoda",
//     role: "Jedi Master",
//     age: 900,
//     forcePoints: 2000
//   },
//   {
//     routeName: "darthmaul",
//     name: "Darth Maul",
//     role: "Sith Lord",
//     age: 200,
//     forcePoints: 1200
//   },
//   {
//     routeName: "obiwankenobi",
//     name: "Obi Wan Kenobi",
//     role: "Jedi Master",
//     age: 55,
//     forcePoints: 1350
//   }
// ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
 
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all characters
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

