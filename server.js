'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require ('./config');
const {BlogPost} = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.get('/blog-posts', (req, res) => {
  BlogPost
    .find()
    .limit(10)
    .then(blog_posts => {
      res.json({
          blog_posts: blog_posts.map(
          (blog_post) => blog_post.serialize()
        )
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

app.get('/blog-posts/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .then(blog_post => res.json(blog_post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error"});
    })
})

app.post('/blog-posts', (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
    for(let i=0; i< requiredFields.length; i++) {
      const field = requiredFields[i];
      if(!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }

    BlogPost
      .create({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
      })
      .then(blog_post => res.status(201).json(blog_post.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({message: "Internal server error"});
      });
});

app.put('/blog-posts', (req, res) =>)
