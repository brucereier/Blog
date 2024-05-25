const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.BUCKET_NAME;
const PUBLISHED_FOLDER = 'published/';

const getObject = async (bucket, key) => {
  const params = { Bucket: bucket, Key: key };
  const data = await s3.getObject(params).promise();
  return data.Body.toString('utf-8');
};

const countWordsInS3 = async (bucket, prefix = '') => {
  const listParams = { Bucket: bucket, Prefix: prefix };
  const files = await s3.listObjectsV2(listParams).promise();
  let totalWordCount = 0;

  for (const file of files.Contents) {
    if (file.Key.endsWith('.md')) {
      const fileData = await getObject(bucket, file.Key);
      totalWordCount += fileData.split(/\s+/).filter(word => word.length > 0).length;
    } else if (file.Key.endsWith('/')) {
      totalWordCount += await countWordsInS3(bucket, file.Key);
    }
  }

  return totalWordCount;
};

const listPublishedArticles = async () => {
  const listParams = { Bucket: BUCKET_NAME, Prefix: PUBLISHED_FOLDER };
  const files = await s3.listObjectsV2(listParams).promise();
  const articles = files.Contents.filter(file => file.Key.endsWith('.md')).map(file => {
    const key = file.Key;
    const keyWithoutPrefix = key.replace(PUBLISHED_FOLDER, '').replace('.md', '');
    const isImportant = keyWithoutPrefix.startsWith('I');
    const datePart = isImportant ? keyWithoutPrefix.substring(1, keyWithoutPrefix.indexOf(' ')) : keyWithoutPrefix.substring(0, keyWithoutPrefix.indexOf(' '));
    const title = keyWithoutPrefix.substring(keyWithoutPrefix.indexOf(' ') + 1);
    return { key, date: datePart, title, isImportant };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const importantArticles = articles.filter(article => article.isImportant);
  const nonImportantArticles = articles.filter(article => !article.isImportant);

  return { importantArticles, nonImportantArticles };
};

app.use(cors());

app.get('/test', (req, res) => {
  res.send('API is running!');
});

app.get('/wordcount', async (req, res) => {
  try {
    const wordCount = await countWordsInS3(BUCKET_NAME);
    res.json({ wordCount });
  } catch (error) {
    console.error('Error fetching word count:', error);
    res.status(500).json({ error: 'Error fetching word count' });
  }
});

app.get('/publishedwordcount', async (req, res) => {
  try {
    const wordCount = await countWordsInS3(BUCKET_NAME, PUBLISHED_FOLDER);
    res.json({ wordCount });
  } catch (error) {
    console.error('Error fetching published word count:', error);
    res.status(500).json({ error: 'Error fetching published word count' });
  }
});

app.get('/published-articles', async (req, res) => {
  try {
    const { importantArticles, nonImportantArticles } = await listPublishedArticles();
    res.json({ importantArticles, nonImportantArticles });
  } catch (error) {
    console.error('Error listing published articles:', error);
    res.status(500).json({ error: 'Error listing published articles' });
  }
});

app.get('/article/:key', async (req, res) => {
  try {
    const key = req.params.key;
    const articleContent = await getObject(BUCKET_NAME, key);
    res.json({ content: articleContent });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Error fetching article' });
  }
});

app.use("/", (req, res) => {
  res.send("Server is running.")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;