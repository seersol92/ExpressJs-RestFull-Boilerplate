const user = require('../models/user'); //import user  model schema
var ObjectID = require('mongodb').ObjectID; 

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of user list.
exports.user_list = function(req, res) {
    user.find({}).select('firstname lastname username email is_admin').exec((err, user_list ) => {
    if (err) {
            res.json({
                success: false,
                errors: err
            });
        } else {
            res.json({
                success: true,
                data: user_list
            });
        }
    });
};

// Display list of user list.
exports.get_user_by_id = function(req, res) {
    user.getUserByUsername(req.params.id, (err, user) => {
   // user.getUserById(req.params.id, (err, user) => {
        if (err) {
            res.json({
                success: false,
                err: err
            });
        } else {
            res.json({
                success: true,
                data: user
            });
        }
    });
};


// Display detail page for a specific Company.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

/*
    METHOD: POST
    INFO  : Handle create new Company on POST.
*/
exports.create_user = function(req, res) {
        const create = new user({
            firstname: req.body.user.firstname.toLowerCase(),
            lastname: req.body.user.lastname.toLowerCase(),
            username: req.body.user.username.toLowerCase(),
            email: req.body.user.email.toLowerCase(),
            password: req.body.user.password,
            is_admin: req.body.user.is_admin
        });
        create.save(function(err) {
            if (err && err.errors) {
                if (err.errors.firstname) {
                    res.json({
                        success: false,
                        message: err.errors.firstname.message
                    });
                } else {
                    if (err.errors.lastname) {
                        res.json({
                            success: false,
                            message: err.errors.lastname.message
                        });
                    } else {
                        if (err.errors.username) {
                            res.json({
                                success: false,
                                message: err.errors.username.message
                            });
                        } else {
                            if (err.errors.email) {
                                res.json({
                                    success: false,
                                    message: err.errors.email.message
                                });
                            } else {
                                if (err.errors.password) {
                                    res.json({
                                        success: false,
                                        message: err.errors.password.message
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                res.json({
                    success: true,
                    message: 'New User Has Been Registered!!'
                });
            }
        });
};

exports.user_update = function(req, res) {
    const query = { '_id' : ObjectID(req.body.userId)};
    const update = {
        firstname: req.body.user.firstname.toLowerCase(),
        lastname: req.body.user.lastname.toLowerCase(),
        username: req.body.user.username.toLowerCase(),
        email: req.body.user.email.toLowerCase(),
      //  password: req.body.user.password,
        is_admin: req.body.user.is_admin
        };
          
       user.findOneAndUpdate(query, update, function(err, user_list) {
       if(err) {
            res.json({
               success: false,
               message:'No, User Found!!',
               error: err
            });
        } else {
             res.json({
               success: true,
               message:'User Has Been Updated Successfully!!'
            });
        }  
    });
};

//  delete on POST.
exports.user_delete_post = function(req, res) {
    user.deleteOne({ _id : req.body.user } , function(err,  user) {
        if(err){
            res.json({
               success: false,
               message:'No, User Found!!'
            });
        } else {
            res.json({
                success: true,
                message:'User Has Been Deleted Successfully!!'
            });
        }
    });
};