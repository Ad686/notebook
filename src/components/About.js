// import React from 'react'
import Navbar from './Navbar'
import React, { useContext} from 'react'
import NoteContext from '../Context/notes/NoteContext'

export default function About() {
    const a = useContext(NoteContext)
   
  return (
    <div>
        <Navbar/>
        This is About 
    </div>
  )
}
