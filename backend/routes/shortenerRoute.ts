import axios from 'axios';
import { Request, Response } from 'express';
import { generate } from 'generate-passphrase';
import { URL } from '../urlSchema.js';

const aliveURL = async (url: string) => {
    let res = await axios.get(url);

    if(res.status === 200) return true
    else return false
}

const genShortCode = async () => {
  const SCHEMA = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortcode = ''
  for(var i=0;i<=7;i++) {
    shortcode += SCHEMA[Math.floor( Math.random() * SCHEMA.length )]
  }

  return shortcode
}

let genPassPhrase = async() => {
  // i wonder if this will generate a 
  // passPhrase that's already on the DB.
  return generate({length: 4, separator: ' ', titlecase: true})
}


export const shortenerRoute = async (req: Request, res: Response) => {
  let { url } = req.body;
  if(!url) return res.send('Url must be provided');

  let isAlive = aliveURL(url);
  if(!isAlive) return res.send('Url is probably Unreachable.');

  let shortCode = await genShortCode();
  let passPhrase = await genPassPhrase()

  let findShortCode = await URL.findOne({shortCode});
  if(findShortCode) {
    shortCode = await genShortCode();
  }

  let findDupPassPhrase = await URL.findOne({passPhrase})
  if(findDupPassPhrase) passPhrase = await genPassPhrase()

  let createdUrl = await URL.create({
    url,
    shortCode,
    passPhrase
  })

  res.json({
    url,
    shortCode,
    passPhrase
  })
}