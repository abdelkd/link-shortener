import mongoose from 'mongoose';

let URLSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  passPhrase: {
    type: String,
    required: true,
    unique: true,
  }
})

export const URL = mongoose.model('URLs', URLSchema);