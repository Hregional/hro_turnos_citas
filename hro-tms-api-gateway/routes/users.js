import express  from 'express';
const router = express.Router();

/* GET users listing. */
export const getUsersRoute = router.get('/', function(_req, res, next) {
  res.send('respond with a resource');
});