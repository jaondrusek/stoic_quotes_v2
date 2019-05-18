var express = require('express');
var router = express.Router();

var getSetQuote = require('../public/javascripts/getSetQuote.js');

var schedule = require('node-schedule');

var j = schedule.scheduleJob('* * * * *', function() {
    console.log('SETTING NEW QUOTE');
    getSetQuote.set_new_quote();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    getSetQuote.get_quote(function(quote) {
        res.send(quote);
    });
});

module.exports = router;