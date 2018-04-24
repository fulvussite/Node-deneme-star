var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/data', (req, res, next) =>{

    var q = req.query.q;
    var url = 'https://swapi.co/api/people/?search=' + q;

    request(url, (error, response, body) =>{
        if(!error && response.statusCode == 200) {
            var veri = JSON.parse(body);
            res.render('veri',{
                veri:veri , title : 'Data'
            })
        }
    });      
});

module.exports = router;