import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import { useState } from 'react';
import Navigation from './components/Navigation';
import { GiJumpingRope } from 'react-icons/gi';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Exercise<GiJumpingRope className="App-logo" />Ledger</h1>
          <p>Designed by Matt Gader using MongoDB, Mongoose, Express, REST, React, and Node</p>
        </header>

        <Navigation />

        <main>
          <article>
            <Route path="/" exact><HomePage setExerciseToEdit={setExerciseToEdit} /></Route>
            <Route path="/add-exercise"><CreatePage /></Route>
            <Route path="/edit-exercise"><EditPage exerciseToEdit={exerciseToEdit} /></Route>
          </article>
        </main>
        
        <footer>Matt Gader, Assignment 6, CS 290, 2021.</footer>
      </Router>
    </div>
  );
}

export default App;