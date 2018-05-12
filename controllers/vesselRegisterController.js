const vessel = require('../models/vessel'); //import vessel  model schema

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of vessel list.
exports.vessel_list = function(req, res) {
 vessel.find({} , function(err, cargo_list) {
        if(err){
              res.json({
                   success: false,
                   errors:err
                });
          } else {
             res.json({
                success: true,
                data: cargo_list
            });
          }
       });
};

// Display detail page for a specific Company.
exports.vessel_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

/*
    METHOD: POST
    INFO  : Handle create new Company on POST.
*/
exports.vessel_create_post = function(req, res) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('own',  'Owner is required').notEmpty();
    req.checkBody('imo',  'IMO Number is required').notEmpty();
    req.checkBody('flag',  'Flag is required').notEmpty();
    req.checkBody('type',  'Type is required').notEmpty();
     var errors = req.validationErrors();
     if (errors) {
        res.json({
            success: false,
            message: errors
        });
     } else {
         
        let createVessel = new vessel({
               name:    req.body.name,
               own:     req.body.own,
               imo:     req.body.imo,
               flag:    req.body.flag,
               type:    req.body.type
              });
            createVessel.save( function(err) {
              if(err && err.errors){
                  res.json({
                       success: true,
                       errors:err.errors
                    });
              } else {
                 res.json({
                    success: true
                });
              }
           });
	 }
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};