const mongoose = require('mongoose');
const schema = mongoose.Schema;
const wordSchema = new schema({
    words: [String]
}, {timestamps: true})

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;


