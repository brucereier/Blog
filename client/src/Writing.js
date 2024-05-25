// Writing.js
import React, { useEffect, useState } from 'react';
import ArticlesList from './ArticlesList';

function Writing() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_BASE_URL
    const PublishedArticlesURL = baseURL + '/test';
    fetch(PublishedArticlesURL)
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ArticlesList/>
  );
}

export default Writing;