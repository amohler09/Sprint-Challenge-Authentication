const router = require('express').Router();
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model')
const {
  jwtSecret
} = require('../config/secrets');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrpyt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);

      res.status(201).json({
        saved,
        token
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error adding user"
      });
    })
});

router.post('/login', (req, res) => {
  let {
    username,
    password
  } = req.body;

  Users.findBy({
      username
    })
    .first()
    .then(user => {
      if (user && bcrpyt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({
          message: "Invalid login credentials"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error logging in"
      });
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "5h"
  };

  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;