const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const minlength = [3, 'The minimum allowed length of `{PATH}` is ({MINLENGTH}).'];
const maxlength = [20, 'The maximum allowed length of `{PATH}` is ({MAXLENGTH}).'];
const validEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const emailLenthChecker = function(email) {
   if(!email){
     return false;
   } else {
     if( email.length < 8 || email.length > 30){
       return false;
     }
     return true;
   }
};
let emailValidators = [
          { validator : emailLenthChecker, message: 'Email must be at least 8 characters but no more than 30' },
          { validator : validEmail,     message: 'Please fill a valid email address'}
]
const userSchema = new Schema({
  firstname: { type: String, required: true, lowercase: true, minlength: minlength, maxlength: maxlength},
  lastname:  { type: String, required: true, lowercase: true, minlength: minlength, maxlength: maxlength },
  username:  { type: String, required: true, lowercase: true, unique: true, uniqueCaseInsensitive: true },
  email:     { type: String,
               required: true,
               lowercase: true,
               unique: true,
               uniqueCaseInsensitive: true,
               validate: emailValidators,
             },
  password:  { type: String, required: true },
  is_admin:  { type: Boolean, default: false },
  dateadded: { type: Date, default: Date.now }
});
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });
userSchema.pre('save', function(next) {
  if (!this.isModified('password'))
  return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  })
});

userSchema.statics.getUserById = function(id, callback) {
  User.findById(id, callback);
}

userSchema.statics.getUserByUsername = function(username, callback) {
  let query = { 'username': username};
  User.findOne(query, callback);
}

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
