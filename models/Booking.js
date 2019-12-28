const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  room: String,
  startDate: Date,
  endDate: Date,
  contact: String,
  adults: String,
  children: String,
  description: String
});

module.exports = mongoose.model('Booking', bookingSchema);