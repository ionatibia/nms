var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
	nombre:{type:String},
	valor:{type:String}
});

module.exports = mongoose.model('Dato', schema);