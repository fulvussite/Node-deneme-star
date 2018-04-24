const express = require('express'),
    Haber = require('../models/haberModels'),
    movies = require('../models/moviesModels'),
    game = require('../models/gameModels'),
    tv = require('../models/tvModels'),
    router = express.Router();




router.get('/', (req, res) => {
    Haber.find({}, (err, foundHaber) => {
        movies.find({}, (err, foundmovies) => {
            game.find({}, (err, foundgames) => {
                tv.find({}, (err, foundtv) => {
                    if (err) {
                        console.log("=======================ERROR ERROR ERROR ===================");
                        console.log(err);
                    } else {
                        console.log("=======================ALLLdata===================");
                        res.render('home', { foundHaber: foundHaber, foundmovies: foundmovies,foundgames:foundgames, foundtv: foundtv, title: 'Home Page' });
                    }


                })
            })
        })
    })
});

module.exports = router;


