import express from 'express';
import mongoose from'mongoose';
import bodyParser from 'body-parser';
import cors  from 'cors';
import path from 'path';

import config from './config/keys.mjs';
import { router } from './routes/api/items.mjs';

const app = express();

// Setting CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));

// Bodyparser
app.use(bodyParser.json());

// DB
const db = config.mongoURI;

// mongo connect
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Conected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', router);

// Serve static app if we are in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Port
const port = process.env.PORT || 80;

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
