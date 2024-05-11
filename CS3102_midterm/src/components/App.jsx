import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NoteForm from "./NoteForm";
import { useNoteFunctions } from "./NoteFunctions";

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    console.log("Fetching data from backend...");
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from backend:", data);
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  }, []);

  const { notes, addNote, deleteNote } = useNoteFunctions(backendData); // Pass backendData instead of data

  return (
    <div className="App">
      <Header />
      <NoteForm onAddNote={addNote} />
      <main className="notes-container">
        {notes.map((note) => (
          <Note
            key={note.key}
            id={note.key}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
