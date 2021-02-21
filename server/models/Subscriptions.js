const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const { ObjectID } = require('bson');

const schema = mongoose.Schema(
  {
    studentName: String,
    courseName: String,
    studentId:ObjectID,
    courseId:ObjectID,
    createAt: Date
  },
  {
    collection: 'subscriptions'
  }
);

schema.plugin(paginate);
schema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('Subscriptions', schema);
