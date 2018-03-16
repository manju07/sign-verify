var express = require('express');
var router = express.Router();
const webCtrl=require("../app/controller/webController");

/* GET sign page. */
router.get('/sign', function(req, res, next) {
  res.render('sign');
});

/* GET verify page. */
router.get('/verify', function(req, res, next) {
  res.render('verify');
});

/** POST sign page*/
router.post("/sign",webCtrl.sign);


/** POST sign page*/
router.post("/verify",webCtrl.verify);


module.exports = router;
