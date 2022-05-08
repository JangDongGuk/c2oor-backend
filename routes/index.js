const express = require('express');
const router = express.Router();

const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('aaa', { title: 'Exress' });
  console.log(path.join(__dirname, "views"));
  console.log((path.resolve(path.join(__dirname, "views"))))
  req.sendFile(path.join(__dirname, "views", "aaa.html" ));
});

module.exports = router;
