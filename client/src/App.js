import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar"
import Home from "./components/Home/Home"
import Transactions from './components/Transactions/Transactions'

function App() {
  return (
      <>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Router>
          <Route exact path="/" render={() => < Home />} />
          <Route exact path="/cart" render={() => < Transactions />} />
        </Router>
        </div>
      </>
  );
}

export default App;
