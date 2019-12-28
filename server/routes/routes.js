const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Booking = require('../../models/Booking');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
 let booking = new Booking();
  booking.room = req.body.room;
  booking.startDate = req.body.startDate;
  booking.endDate = req.body.endDate;
  booking.contact = req.body.contact;
  booking.adults = req.body.adults;
  booking.children = req.body.children;
  booking.description = req.body.description;

booking.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.send('Booking successfully added!');
  });
});


router.route('/update')
.post(function(req, res) {
 const doc = {
    room: req.body.room,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    contact: req.body.contact,
    adults: req.body.adults,
    children: req.body.children,
    description: req.body.description
 };

 console.log(doc);

 Booking.update({_id: req.body._id}, doc, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.send('Booking successfully updated!');
 });
});


router.get('/delete', function(req, res){
 let id = req.query.id;

 Booking.find({_id: id}).remove().exec(function(err, booking) {
    if(err) {
      res.send(err)
    }
    res.send('Booking successfully deleted!');
 });
});


router.get('/getAll', function(req, res) {
  Booking.find(function(err, bookings) {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  });
});

module.exports = router;