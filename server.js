const express = require('express');
const cors = require('cors');
const fs = require('fs');
let notesData = require('./data/notes'); // Importing notes data from notes.js

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to get all notes
app.get("/api", (req, res) => {
    res.json(notesData); // Serve the notes data
});

// Endpoint to add a new note
app.post("/api", (req, res) => {
    const newNote = req.body; // Get the new note from the request body
    newNote.key = Date.now(); // Generate a unique key for the new note
    notesData.push(newNote); // Add the new note to the notes array
    // Write the updated notes data back to the file
    fs.writeFile('./data/notes.js', `module.exports = ${JSON.stringify(notesData)}`, (err) => {
        if (err) {
            console.error('Error writing to notes file:', err);
            res.status(500).json({ message: 'Server error' });
        } else {
            res.status(201).json({ message: "Note added successfully", note: newNote });
        }
    });
});

// Endpoint to delete a note by ID
app.delete("/api/:id", (req, res) => {
    const id = parseInt(req.params.id); // Parse the note ID from the request parameters
    console.log('in server, deleting ID', id)
    notesData = notesData.filter(note => note.key !== id); // Filter out the note with the specified ID
    // Write the updated notes data back to the file

    fs.writeFile('./data/notes.js', `module.exports = ${JSON.stringify(notesData)}`, (err) => {
        if (err) {
            console.error('Error writing to notes file:', err);
            res.status(500).json({ message: 'Server error' });
        } else {
            res.json({ message: "Note deleted successfully", deletedNoteId: id });
        }
    });
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
