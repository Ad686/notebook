import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import Notesitem from './Notesitem';
import Addnote from './Addnote';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const Notes = () => {
    const context = useContext(NoteContext);
    const navi= useNavigate();
    // const {notes} = context;
    // const {notes, addNote} = context;
    const {notes, getNotes} = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            
            getNotes()
        } else {
            navi('/')
            
        }
    }, [])
    return (
        <> 
        <Navbar/>
        <Addnote/>
        <div className="row my-3 mx-3">
            {notes.map((note) => {
                return (<Notesitem note={note} />)
            })}
        </div>
        </>
    )
}

export default Notes
