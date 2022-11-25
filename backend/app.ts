import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { shortenerRoute } from './routes/shortenerRoute.js'
import { getUrl } from './routes/getUrlRoute.js'
import { env } from 'process'

import dotenv from 'dotenv';
dotenv.config()

let app = express();

mongoose.connect(env.DB_CONNECT!)
  .then(() => console.log('DB is Connected'))
  .catch(e => console.log(e.message));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

app.post('/api/v1/shorten', shortenerRoute);
app.get('/:shortCode', getUrl)


app.listen(env.PORT || 3000, () => {
  console.log('Server is running...')
});