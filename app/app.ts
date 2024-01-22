var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()

const { connectDB } = require("./config/db.config");

import productRouter from "./routers/product.router";
import helmet from "helmet";
import pmodelRouter from "./routers/pmodel.router";

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(helmet.xssFilter());
// app.use(helmet.referrerPolicy({policy: 'same-origin'}));
app.use(cors())
connectDB()

app.use('/product', productRouter);


// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:any) {
  next(createError(404));
});

// error handler
app.use(function(errors:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = errors.message;
  res.locals.error = req.app.get('env') === 'development' ? errors : {};

  // render the error page
  res.status(errors.status || 500).json({ status: false , errors: errors });
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running in port --> ${PORT}`)
);
