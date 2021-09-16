import { useState } from "react";
import NoteContext from "./NoteContext";
export const NoteState = (props) => {
  const addurl = "http://localhost:5000/api/notes/addnote";
  // const updaturl="http://localhost:5000/api/notes/updatenote/";
  const fetchurl="http://localhost:5000/api/notes/fetchallnotes";
  const deleteurl="http://localhost:5000/api/notes/deletenote/";


  const initialNotes = []
  const [notes, setnotes] = useState(initialNotes)

  // Get all Notes .API Call 
  const getNotes = async () => {
    
    const response = await fetch(fetchurl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MjI2N2JjZGRhZDg3MGQxYTI1MGM0In0sImlhdCI6MTYzMTcyNTE3OX0.hw3GcL4MM-WqVS5mI7YkgCzlHadVbllplXT_sGxwoBA"
      }
    });
    const json = await response.json()
    setnotes(json)
  }


  //AddNotes.//APi for addinging a note
  const addnote = async (title, description, tag) => {

    const response = await fetch(addurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MjI2N2JjZGRhZDg3MGQxYTI1MGM0In0sImlhdCI6MTYzMTcyNTE3OX0.hw3GcL4MM-WqVS5mI7YkgCzlHadVbllplXT_sGxwoBA"
      },
      body: JSON.stringify({ title, description, tag })

    });
    const note = await response.json();

    setnotes(notes.concat(note))
}

  //Delete Note.//APi for addinging a note.
  const deletenote = async(id) => {
  
       await fetch(`${deleteurl}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MjI2N2JjZGRhZDg3MGQxYTI1MGM0In0sImlhdCI6MTYzMTcyNTE3OX0.hw3GcL4MM-WqVS5mI7YkgCzlHadVbllplXT_sGxwoBA"
      }
    
    });
    const NewNotes = notes.filter((note) => { return note._id !== id })
    setnotes(NewNotes)

  }

  //Edit Note...
  //  const editnote=async (id,title,description,tag)=>{

  //   const response = await fetch(url, {
  //     method: 'POST', 
  //     headers: {
  //       'Content-Type': 'application/json'
  //      },

  //   });
  //   const res= response.json(); 

  //  for (let index = 0; index < notes.length; index++) {
  //    const element = notes[index];
  //    if (element._id===id) {
  //      notes.title=title;
  //      notes.description=description;
  //      notes.tag=tag;

  //    }

  //  }

  // }
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}





