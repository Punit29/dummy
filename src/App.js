import React from 'react';
import './App.css';
import Header from './components/header';
import Boards from './components/boards';
import Home from './components/Home';
import Lists from './components/Lists';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/boards' exact component={Boards} />
        <Route path='/board/:id' exact component={Lists} />
      </React.Fragment>
    </Router>
  );
}

export default App;
