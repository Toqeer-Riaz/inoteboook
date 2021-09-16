import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import { NoteState } from './context/notes/NoteState';
import Notes from './components/Notes';

function App() {
  return (
    
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <div className="container">
      <Switch>
          <Route exact path="/">
             <Home/>
          </Route>
          <Route exact path="/notes">
            <Notes/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
        </Switch>
     </div>
      </Router>
      </NoteState>
    </>
    
  )
}

export default App
