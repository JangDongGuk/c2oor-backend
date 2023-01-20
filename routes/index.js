import { Router } from 'express';
import { createClient } from 'redis';

require('dotenv').config()
const router = Router();

const redisInit = async() =>  {
  const redisClient = createClient({'url': "redis://127.0.0.1:6379" });
  console.log(redisClient);
  await redisClient.connect();
}
redisInit();

router.get('/', function(req, res, next) {
  res.render('index.html');
});

module.exports = router, redisInit;
