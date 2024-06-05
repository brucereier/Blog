import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Software from './Software';
import Writing from './Writing';
import Article from './Article';
import Bookshelf from './Bookshelf';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Software />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/article/:key" element={<Article />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </Router>
  );
}

export default App;
