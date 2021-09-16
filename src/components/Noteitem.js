import React, {useContext} from 'react'
import NoteContext from "../context/notes/NoteContext"
const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const {deletenote} = context;
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <i className="far fa-trash-alt mx-3"  style={{cursor:"pointer"}} onClick={()=> deletenote(note._id)}></i>
                     <i className="far fa-edit mx-3"   style={{cursor:"pointer"}}></i>

                </div>
            </div>
        </div>
    )
}
export default Noteitem