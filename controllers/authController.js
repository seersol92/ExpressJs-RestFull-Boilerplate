const User = require('../models/user'); //import user  model schema
const jwt = require('jsonwebtoken');
const config = require('./../config/database');


/**
 * @method POST
 * @param {*} req 
 * @param {*} res 
 */

exports.register = (req, res) => {
      req.checkBody('firstname', 'First Name is required').notEmpty();
      req.checkBody('lastname',  'Last Name is required').notEmpty();
      req.checkBody('username', 'User Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email does not appear to be valid').isEmail();
      req.checkBody('password', 'Password is required').notEmpty();
      // check the validation object for errors
      var errors = req.validationErrors();
      if (errors) {
        return res.status(500).json({ success: false, message: errors });
      } else {
        let user = new User({
            firstname: req.body.firstname.toLowerCase(),
            lastname:  req.body.lastname.toLowerCase(),
            username:  req.body.username.toLowerCase(),
            email:     req.body.email.toLowerCase(),
            password:  req.body.password,
            is_admin: req.body.is_admin
        });
        user.save( function(err) {
           if(err && err.errors){
             if(err.errors.firstname) {
                return res.status(500).json({ success: false, message: 'First name validation failed!!', error: err.errors.firstname.message  });
             }else {
               if(err.errors.lastname) {
                 return res.status(500).json({ success: false, message: 'Last name validation failed!!', error: err.errors.lastname.message  });
               } else {
                 if(err.errors.username) {
                    return res.status(500).json({ success: false, message: 'User name validation failed!!', error: err.errors.lastname.message  });
                 } else {
                   if(err.errors.email) {
                    return res.status(500).json({ success: false, message: 'Email validation failed!!', error: err.errors.lastname.message  });
                   }else {
                     if(err.errors.password) {
                        return res.status(500).json({ success: false, message: 'Password validation failed!!', error: err.errors.lastname.message  });
                     }
                   }
                 }
               }
             }
           } else {
             return res.status(200).json({
                 success: true,
                 message: 'User Registered'
             });
           }
        });
      }
    
};

/**
 * @method POST
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
  // validate the input
  req.checkBody('user', 'Username Or Email is required').notEmpty();
  req.checkBody('password',  'Password is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(401).json({   success: false, message: errors  });
  } else {
    const Projection = {
     __v     : false,
     dateadded: false
   };
    User.findOne( {username: req.body.user.toLowerCase() }, Projection, (err, user) => {
      if(err) {
        return res.status(401).json({   success: false, message: err  });
      } else if (!user) {
           User.findOne( {email: req.body.user.toLowerCase() }, Projection, (err, user) => {
             if(err) {
                return res.status(401).json({   success: false, message: err  });
              } else if (user) {
                let validatePassword = user.comparePassword(req.body.password);
                  if(!validatePassword) {
                    return res.status(401).json({   success: false, message: 'Invalid Password!'  });
                  } else {

                    const token = jwt.sign(
                        {
                          username: user.username,
                          email: user.email,
                          userId: user._id,
                          isAdmin: user.is_admin
                        },
                        config.secret,
                        {
                          expiresIn: "24h"
                        }
                      );
                      return res.status(200).json({
                        message: "Authenticated!!",
                        token: token,
                        data: 
                        { 
                            username: user.username,
                            email: user.email,
                            isadmin: user.is_admin,
                            loggedId: user._id 
                        }
                      });
                  }
              } else {
              return  res.status(401).json({   success: false, message: 'Invalid Username Or Email!'  });
               }
           });
      } else {
        let validatePassword = user.comparePassword(req.body.password);
        if(!validatePassword) {
          return  res.status(401).json({  success: false,  message: 'Invalid Password!'
            });
        } else {
            const token = jwt.sign(
                {
                  username: user.username,
                  email: user.email
                },
                config.secret,
                {
                  expiresIn: "24h"
                }
              );
              return res.status(200).json({
                message: "Authenticated!!",
                token: token,
                data: 
                { 
                    username: user.username,
                    email: user.email
                }
              });
        }
      }
    });
  }
};

exports.check_username_availability = (req, res) => {
  const username = req.params.username.toString();
  const regExp = new RegExp("^([a-zA-Z0-9_-]){3,20}$");
  if (!username || !regExp.test(username)) {
    res.json({success: false, message: 'User Name is not valid' });
  } else {
    User.findOne( { "username": username }, (err, user) => {
      if (err) {
       res.json({ success: false, message: err });
     } else {
         if (user) {
           res.json({ success: true });
         } else {
           res.json({ success: false });
         }
     }
    });
  } 
}

exports.check_email_availability = (req, res) => {
  const email = req.params.email.toString();
  const regExp = new RegExp(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/);
  if (!email || !regExp.test(email)) {
    res.json({success: false, message: 'E-mail is not valid' });
  } else {
    User.findOne( { "email": email }, (err, user) => {
      if (err) {
       res.json({ success: false, message: err });
     } else {
         if (user) {
           res.json({ success: true });
         } else {
           res.json({ success: false });
         }
     }
    });
  }
}

/**
 * @method GET
 * 
 */
exports.profile = (req, res) => {
   res.status(200).json({ message: "Authenticated!!", user: req.userData});
}