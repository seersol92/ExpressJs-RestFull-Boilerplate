const Company = require('../models/company_register'); //import company_register  model schema

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Company.
exports.company_list = function(req, res) {
 Company.find({} , function(err, cargo_list) {
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
exports.Company_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

/*
    METHOD: POST
    INFO  : Handle create new Company on POST.
*/
exports.company_create_post = function(req, res) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('type',  'Type is required').notEmpty();
    req.checkBody('address',  'Address is required').notEmpty();
    req.checkBody('city',  'City is required').notEmpty();
    req.checkBody('state',  'State is required').notEmpty();
    req.checkBody('zip',  'Zip is required').notEmpty();
    req.checkBody('country',  'Country is required').notEmpty();
    req.checkBody('phone',  'Phone is required').notEmpty();
     var errors = req.validationErrors();
     if (errors) {
        res.json({
            success: false,
            message: errors
        });
     } else {
         
        let company = new Company({
               name:    req.body.name,
               type:    req.body.type,
               address: req.body.address,
               address2:req.body.address2,
               address3:req.body.address3,
               city:    req.body.city,
               state:   req.body.state,
               zip:     req.body.zip,
               country: req.body.country,
               phone:   req.body.phone
              });
            company.save( function(err) {
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



// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};