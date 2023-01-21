/*
============================================
 Title: item.js
 Author: Andres Macias
 Date:   01/16/23
 Description: create Item schema to be used in employee model
===========================================
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String }
})

module.exports = itemSchema;
