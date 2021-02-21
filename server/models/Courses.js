const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const schema = mongoose.Schema(
  {
    name: String,
    details: String,
    createdAt: Date
  },
  {
    collection: 'courses'
  }
);

schema.plugin(paginate);
schema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('Courses', schema);
