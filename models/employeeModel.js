var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	'name': { type: String, required: true },
	'age': { type: Number, required: true, min: 20, max: 65 },
	'designation': { type: String, required: true },
	'activeStatus': { type: Boolean, required: true, default: true },
	'emailID': { type: String, required: true, unique: true }
});

module.exports = mongoose.model('employee', employeeSchema);


employeeSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
