const express = require('express');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

const VAULT_PATH = '/Users/bruce/Documents/writing';

app.use(cors());

const countWords = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return data.split(/\s+/).filter(word => word.length > 0).length;
};

const updateWordCount = (directoryPath) => {
  const items = fs.readdirSync(directoryPath);
  items.forEach(item => {
    const fullPath = path.join(directoryPath, item);
    const stats = fs.statSync(fullPath);
    if (stats.isFile() && fullPath.endsWith('.md')) {
      const fileWordCount = countWords(fullPath);
      //console.log(`Counted ${fileWordCount} words in file: ${fullPath}`);
      wordCount += fileWordCount;
    } else if (stats.isDirectory()) {
      updateWordCount(fullPath);
    }
  });
};

const refreshWordCount = () => {
  wordCount = 0;
  updateWordCount(VAULT_PATH);
  //console.log(`Total word count: ${wordCount}`);
};

chokidar.watch(VAULT_PATH, { persistent: true })
  .on('add', refreshWordCount)
  .on('change', refreshWordCount)
  .on('unlink', refreshWordCount);

app.get('/wordcount', (req, res) => {
  res.json({ wordCount });
});

app.listen(PORT, () => {
  //console.log(`Server is running on http://localhost:${PORT}`);
  refreshWordCount(); 
});