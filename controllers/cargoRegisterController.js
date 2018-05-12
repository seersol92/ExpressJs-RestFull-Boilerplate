const CargoRegister = require('../models/cargo_register'); //import CargoRegister  model schema

// Display list of all cargo register.
exports.cargo_list = function(req, res) {
 CargoRegister.find({} , function(err, cargo_list) {
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

// Display detail page for a specific cargo register.
exports.cargo_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

/*
    METHOD: POST
    INFO  : Handle create new cargo on POST.
*/
exports.cargo_create_post = function(req, res) {
    req.checkBody('grade', 'Grade is required').notEmpty();
    req.checkBody('description',  'Description is required').notEmpty();
    req.checkBody('type',  'Type is required').notEmpty();
     var errors = req.validationErrors();
     if (errors) {
        res.json({
            success: false,
            message: errors
        });
     } else {
         
        let cargo = new CargoRegister({
           grade: req.body.grade.toLowerCase(),
           description:  req.body.description.toLowerCase(),
           type:  req.body.type.toLowerCase()
          });
           cargo.save( function(err) {
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