var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var videoSchema = new Schema({

  name: String,
  description: String,
  likes: { type :Number , default:0 },
  createdOn : { type: Date , default: Date.now },
  category: String,
  url: String

});


var Videos = mongoose.model('Videos',videoSchema);

module.exports = Videos;
