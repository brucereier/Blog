// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Software from './Software';
import Writing from './Writing';
import Article from './Article';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Software />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/article/:key" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;