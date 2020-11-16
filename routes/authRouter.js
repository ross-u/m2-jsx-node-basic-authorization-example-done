// routes/authRouter.js
const express = require("express");
const authRouter = express.Router();
const User = require("./../models/User.model");
const zxcvbn = require('zxcvbn');


// Require bcrypt
// Create the variable for the number of salt rounds
const bcrypt = require('bcrypt');
const saltRounds = 10;


//	GET    '/auth/signup'
authRouter.get("/signup", (req, res, next) => {
  res.render("Signup");
});


// POST /auth/singup
authRouter.post('/signup', (req, res, next) => {
  const { username, password} = req.body;

  if ( username === '' || password === '') {
    const props = { errorMessage: 'Enter the username and password'};
    res.render('Signup', props);
    return;
  }

  // Check the password strength
  if (zxcvbn(password).score < 3) {
    const props = { errorMessage: 'Password too weak, try again'};
    res.render('Signup', props);
    return;
  }


  // Check the users collection if the username already exists
  User.findOne( { username })
    .then( ( user ) => {
      // > if `username` already exists in the DB, display error message
      if ( user !== null ) {
        const props = { errorMessage: 'The username already exists'};
        res.render('Signup', props);
        return;
      }

      // > if `username` doesn't exist hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // > After hashing the password, create new user in DB
      User.create({ username, password: hashedPassword })
      .then( () => {
          res.redirect('/');
          // > When the new user is created, redirect to the home page
        })
        .catch( (err) => {
          const props = { errorMessage: 'Error while signing up the new user'};
          res.render('Signup', props);
        });

    })
    .catch( (err) => console.log(err));  // catch errors from User.findOne
    



    // catch error 
})

module.exports = authRouter;
