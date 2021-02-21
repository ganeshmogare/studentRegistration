const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const schema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dob:Date,
    phone:Number
  },
  {
    collection: 'students'
  }
);

schema.plugin(paginate);
schema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('Students', schema);
