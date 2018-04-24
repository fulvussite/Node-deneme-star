const express = require('express'),
    tv = require('../models/tvModels'),
    router = express.Router();


router.get('/addtv', isLoggedIn, (req, res) => {
    res.render('tv/addtv');
});

router.get('/tv', (req, res) => {
    tv.find({}, (err, foundtv) => {
        if (err) {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        } else {
            console.log("=======================ALLL tvSSS ===================");
            res.render('tv/tv', { foundtv: foundtv });
        }

    })

});

router.post('/addtv', isLoggedIn, (req, res) => {
    let title = req.body.data.title;
    let image = req.body.data.image;
    let icerik = req.body.data.icerik;
    let content = req.body.data.content;


    let newtv = { title: title, image: image, content: content, icerik: icerik };

    tv.create(newtv)
        .then((newtv) => {
            console.log(newtv);
            res.status(201).json(newtv);
        })
        .catch((err) => {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
            res.send(err);
        });

});

router.delete("/tvs/:tvId", isLoggedIn, (req, res) => {
    tv.findByIdAndRemove(req.params.tvId, (err) => {
        if (err) {
            console.log(err)
            res.redirect("/tvlist");
        } else {
            res.redirect("/tvlist");
        }
    });
});

router.get('/tvs/:tvId', (req, res) => {
    tv.findById(req.params.tvId)
        .then((foundtv) => {
            res.render("tv/showtv", { foundtv: foundtv });
        })
        .catch((err) => {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
            res.send(err);
        });
});

router.get('/tvlist', (req, res) => {
    tv.find({}, (err, foundtv) => {
        if (err) {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        } else {
            console.log("=======================ALLL tvSSS ===================");
            res.render('tv/tvlist', { foundtv: foundtv });
        }

    })

});



router.get("/testing", (req, res) => {
    tv.find()
        .then((foundtvs) => {
            res.json(foundtvs);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});







function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/signin");
}


module.exports = router;
