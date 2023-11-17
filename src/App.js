import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
// import { B Route, Router, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
// import Navbar from './components/Navbar';
import NoteState from './Context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Notes from './components/Notes';

function App() {
  return (
    <div >
      <NoteState>
     <Router>
      <Routes>
        
        <Route path='Login' element={<Login/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='About' element={<About/>}></Route>
        <Route path='Signup' element={<Signup/>}></Route>
        <Route path='Notes' element={<Notes/>}></Route>






        {/* <Route path='Navbar' element={<Navbar/>}></Route> */}
  
     </Routes>
     </Router>
     </NoteState>
    </div>
   
  );
}

export default App;
