import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const deleteHandler = async (id) => {
    const res = await axios.delete("http://localhost:8000/notes/" + id);

    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div item key={note.id}>
            <NoteCard note={note} deleteHandler={deleteHandler} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
