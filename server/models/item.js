const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String },
  todo: [Item],
  done: [Item]
})

module.exports = mongoose.model('Item', itemSchema);
