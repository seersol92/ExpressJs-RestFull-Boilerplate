const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
    name:   {type: String, required: true},
    type:   {type: String, required: true},
    address:{type: String, required: true},
    address2:{type: String, required: false},
    address3:{type: String, required: false},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true},
    phone: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
	dateadded: { type: Date, default: Date.now }

});
module.exports = mongoose.model('Comapny', schema);