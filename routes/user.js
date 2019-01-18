const router = require('express').Router();
const User = require('../models/user');

router.route('/signup')
  .get((req, res, next) => {
    res.render('accounts/signup', { message: req.flash('errors') });
  })
  .post((req, res, next) => {
    User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', 'Account with that email address already exist');
        res.redirect('/signup');
      } else {
        var user = new User();
        user.name = req.body.name;
        user.photo = user.gravatar();
        user.password = req.body.password;
        user.save(function(err) {
          req.login(user, function(err) {
            if (err) return next(err);
            res.redirect('/');
          });
        });
      }
    });
  });