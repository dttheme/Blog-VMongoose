'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const blogPostSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String,
  },
  title: {type: String, required: true},
  content: {type: String},
  created: {type: Date, default: Date.now}
})

blogPostSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorString,
    title: this.title,
    content: this.content,
    created: this.created
  };
}

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};
