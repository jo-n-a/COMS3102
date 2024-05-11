// NoteForm.jsx
import React, { useState } from "react";

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleAddNote() {
    if (title.trim() !== "" || content.trim() !== "") {
      onAddNote({
        key: Date.now(),
        title: title,
        content: content,
      });
      setTitle("");
      setContent("");
    }
  }

  return (
    <div className="note-input">
      <h1>
        <input
          className="title-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </h1>
      <p>
        <input
          className="content-input"
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </p>
      <button className="add-button" onClick={handleAddNote}>
        Add
      </button>
    </div>
  );
}

export default NoteForm;
