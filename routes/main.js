const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('main/landing');
});

router.get('/create-new-user', (req, res, next) => {
  var user = new User();
  user.email = "adul@gmail.com";
  user.name = "adul";
  user.password = "adul123";
  user.save(function(err) {
    if (err) return next(err);
    res.json("Succesfully created");
  });
});

module.exports = router;