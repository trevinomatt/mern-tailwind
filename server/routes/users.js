const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

const config = require('../config/email');

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

router.post('/forgotpassword', (req, res) => {
    if (req.body.email === '') {
        return res.status(400).send('email required');
    }
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.status(403).json({
                sentEmailSuccess: false,
                message: "There is no user on the email list."
            })
        } else {
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).send(err);
                } else {
                    const token = user.token;

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: `${config.emailAddress}`,
                            pass: `${config.emailPassword}`
                        },
                    });

                    const mailOptions = {
                        from: `${config.emailAddress}`,
                        to: `${user.email}`,
                        subject: 'Link To Reset Password',
                        text:
                            'You are receiving this because you (or someone else) have requestd the reset of the password for your account.\n\n'
                            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n'
                            + `http://localhost:3000/reset/${token}\n\n`
                            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                    };

                    console.log('sending mail');

                    transporter.sendMail(mailOptions, (err, response) => {
                        if (err) {
                            console.error('there was an err: ', err);
                        } else {
                            console.log('here is the res: ', response);
                            res.status(200).json({
                                sentEmailSuccess: true,
                                message: "Recovery email sent."
                            })
                        }
                    });
                }
            })
        }
    })
})

module.exports = router;