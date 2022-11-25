import { Request, Response } from 'express';
import { URL } from '../urlSchema.js';

export const getUrl = async (req: Request, res: Response) => {
  let { shortCode } = req.params;
  if(!shortCode) return res.status(404)

  let findUrl = await URL.findOne({ shortCode });
  if(!findUrl) return res.status(404).json({
    ok: false
  });

  res.status(200).json({
    ok: true,
    url: findUrl.url
  })
}