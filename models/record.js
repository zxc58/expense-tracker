//
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({})
//
module.exports = mongoose.model('Record', recordSchema)
