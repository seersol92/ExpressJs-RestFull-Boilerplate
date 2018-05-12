const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
    grade: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
	dateadded: { type: Date, default: Date.now }

});
module.exports = mongoose.model('CargoRegister', schema);
