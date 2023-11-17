
import React, { useContext } from 'react'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { Delete, Edit } from '@mui/icons-material';
import noteContext from '../Context/notes/NoteContext';



const Notesitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
    const {note} = props;
  return (
    <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className ="card-body">
                    <div className='d-flex align-item-center'>
                <h5 className ="card-title">{note.title}</h5><i className='mx-1'  onClick={()=>{deleteNote(note._id)}}><Delete/></i>
                <i className='mx-1'><Edit/></i>
                </div>
                <p className ="card-text">{note.description}</p> 
                

                </div>
            </div>
        </div>
  )
}

export default Notesitem

