const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3001;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.BUCKET_NAME;

let wordCount = 0;

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
      // If the key ends with '/', it's a folder, so we need to traverse it recursively
      totalWordCount += await countWordsInS3(bucket, file.Key);
    }
  }

  return totalWordCount;
};

app.use(cors());

// Endpoint to get word count from S3
app.get('/wordcount', async (req, res) => {
  try {
    wordCount = await countWordsInS3(BUCKET_NAME);
    res.json({ wordCount });
  } catch (error) {
    console.error('Error fetching word count:', error);
    res.status(500).json({ error: 'Error fetching word count' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
