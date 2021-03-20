const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

// ========================================
// User
// ========================================

router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "There is no user on the email list."
            })
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({
                        loginSuccess: false,
                        message: "incorrect password"
                    })
                } else {
                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send(err);
                        } else {
                            // save token cookie
                            res.cookie("x_auth", user.token)
                            .status(200)
                            .json({
                                loginSuccess: true,
                                userId: user._id
                            })
                        }
                    })
                }
            })
        }
    })
})

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id},
    { token: ""},
    (err, user) => {
      if (err) {
        return res.json({ success: false, err })
      } else {
        return res.status(200).send({
          success: true
        })
      }
    }
  );
})

module.exports = router;