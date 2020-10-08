//Dwpendancies:
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");
let notes = require("./Develop/db/db");
let { nanoid } = require("nanoid");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080; //should be 8000????

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public')); ///explain





// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
 
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// Displays notes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});


// Create New Notes- takes in JSON input
app.post("/api/notes", function(req, res) {
  
 let newNote = req.body;
 newNote.id = nanoid();
  notes.push(newNote);
  fs.writeFile("./Develop/db/db.json", JSON.stringify(notes), "utf8", function (err) {
    if (err) {
      throw err;
    }
    console.log("success!");
    return res.json(newNote);
  });
});

// Delete Notes
app.delete("/api/notes/:id", function (req, res) {
  var noteID = req.params.id;
  console.log(noteID);
  let index = notes.map(x => {
    return x.id;
  }).indexOf(noteID);

  notes.splice(index, 1);
  fs.writeFile("./Develop/db/db.json", JSON.stringify(notes), "utf8", function (err) {
    if (err) {
      throw err;
    }
    console.log("success!");
    return res.json(noteID);
  });
});

  // console.log(newNote);

  // We then add the json the user sent to the character array
//  entry.push(entry);

  // We then display the JSON to the users
  // res.json(entry);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
