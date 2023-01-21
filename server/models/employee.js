/*
============================================
 Title: employee.js
 Author: Andres Macias
 Date:   01/16/23
 Description: contains employee model
===========================================
*/

const mongoose = require('mongoose');
const itemSchema = require('./item');

const Schema = mongoose.Schema;

/**
 * matches the fields in the database and impacts the item schema.
 */
let employeeSchema = new Schema({
  empId: {type: Number, unique: true, required: true},
  firstName: { type: String },
  lastName: { type: String },
  todo: [itemSchema],
  done: [itemSchema]
}, {collection: 'employees'})

module.exports = mongoose.model('Employee', employeeSchema);
