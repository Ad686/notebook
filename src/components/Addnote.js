import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import Navbar from './Navbar';

export default function Addnote() {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      {/* <Navbar /> */}
      <h1 className='container my-3'>Add Note</h1>
      <div className='container my-3'>
        <form>
          <div className="mb-3">
            <h5> <label className="form-label">Write your note here</label></h5>
            <input type="text" className="form-control desc" id="title" name='title' placeholder='Title' onChange={onChange} />
            <textarea type="text" className="form-control my-3 desc" style={{ height: "40vh" }} placeholder='Description' id="description" name="description" onChange={onChange} />
         </div>
          <button type="submit" className="btn btn-warning sub" onClick={handleClick}>Submit</button>
        </form>

      </div>
    </div>
  )
}
