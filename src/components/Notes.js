import React, {useContext,useEffect} from 'react'
import NoteContext from "../context/notes/NoteContext"
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = () => {
    const context = useContext(NoteContext);
    const {notes,getNotes} = context;
    useEffect(() => {
        getNotes()
    }, [])
    return (
        <div className="container row my-3">
            <AddNote/>
            <h2 >You Notes</h2> 
            {notes.map((note)=>{
                return <Noteitem key={note._id} note={note}/>  
            })}
            </div>
    )
}
export default Notes