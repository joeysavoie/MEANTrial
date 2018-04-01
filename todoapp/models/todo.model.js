const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

todoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Todo', todoSchema)