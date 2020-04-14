/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

const { PORT } = process.env;
const app = express();

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes);

app.get('/', (req, res) => {
  res.json({
    status: 'up',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
