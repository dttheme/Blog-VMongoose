'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require ('./config');
const {BlogPost} = require('./models');

const app = express();
app.use(bodyParser.json());

app.get('/blog-posts', (req, res) => {
  BlogPost
    .find()
    .limit(10)
    .then(blog-app => {
      res.json({
        blog-app: blog-app.map(
          (blog-app) => blog-app.serialize()
        )
      });
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'});
    });
});
