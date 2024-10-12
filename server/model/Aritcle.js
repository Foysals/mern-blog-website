const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // thumbnail: {
  //   type: String, // Store image path or URL
  // },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Aritcle', ArticleSchema);












// const ArticleSchema  = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
// });

// module.exports = mongoose.model('Aritcle', ArticleSchema );


