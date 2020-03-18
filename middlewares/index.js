const express = require('express');
const morgan = require('morgan');

module.exports = (app) => {
     app.use(morgan('dev'));
     app.use(express.json());
     app.use(express.static("public"));
     app.use('/uploads', express.static("/uploads"));
     app.use(express.urlencoded({ extended: false }));
     app.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*")
          res.header("Access-Control-Allow-Headers", "*")
          if (req.method == 'OPTIONS') {
               res.header("Access-Control-Allow-Methods", "PUT, DELETE, PATCH, POST, GET")
               return res.status(200).send({})
          }
          next()
     })

     return app
}