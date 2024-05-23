import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Software from './Software';
import Writing from './Writing';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Software />} />
        <Route path="/writing" element={<Writing />} />
      </Routes>
    </Router>
  );
}

export default App;