import { useState, useEffect } from "react";

export function useNoteFunctions(initialNotes) {
  const [notes, setNotes] = useState([]); // Initialize with an empty array

  useEffect(() => {
    console.log("Fetching initial notes...");
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        console.log("Initial notes fetched:", data);
        setNotes(data); // Update notes with fetched data
      })
      .catch((error) => {
        console.error("Error fetching initial notes:", error);
      });
  }, []);
  function addNote(newNote) {
    console.log('adding note');
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes((prevNotes) => [...prevNotes, data.note]);
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  } 

  function deleteNote(id) {
    console.log('Deleting note:', id);
    fetch(`/api/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
      })
      .then(() => {
        console.log("Note deleted successfully:", id);
        setNotes((prevNotes) => prevNotes.filter((note) => note.key !== id));
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
}

  return {
    notes,
    addNote,
    deleteNote,
  };
}