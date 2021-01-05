const router = require('express').Router();
let User = require('../models/user.model');

// login
router.route('/').post((req, res) => {
  const { email, password } = req.body;
  User.find({ email: email })
    .then(user => {
      if (user[0].email === email && user[0].password === password) {
        const encPassword = new Buffer(user[0].password).toString('base64');
        user[0].password = encPassword;
        res.json({ status: 'Success', ...user[0] });
      } else {
        res.json({ status: 'Failed' });
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// duplicate email checking
router.route('/customerRegistration/:email').get((req, res) => {
  User.find({ email: req.params.email })
    .then(user => {
      if (user.length) {
        res.json({ status: 'Failed' });
      } else {
        res.json({ status: 'Passed' });
      }
    })
    .catch(err => {
      res.status(400).json({ status: 'Failed', error: err })
    });
});

// customer registration
router.route('/customerRegistration').post((req, res) => {
  const { firstName, lastName, mobile, city, email, password } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    mobile,
    email,
    city,
    password
  });

  newUser.save()
    .then(() => res.json({ status: 'Success' }))
    .catch(err => res.status(400).json('Error ' + err))
});

module.exports = router;