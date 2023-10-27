import express from 'express';
var router = express.Router();

/* GET home page. */
export const indexRouter = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});