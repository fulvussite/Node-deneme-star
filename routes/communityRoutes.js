const express = require('express'),
    Yorum = require('../models/yorum'),
    community = require('../models/communityModels'),
    router = express.Router();

router.get("/community", function (req, res) {
    //communityi database'den al
    community.find({}, function (err, communityDB) {
        if (err) {
            console.log(err);
        } else {
            console.log("*******************community********************");
            console.log(communityDB);
            res.render("community/community", { community: communityDB });
        }
    });
    /*res.render("community", {community:community})*/
});

router.post("/community", isLoggedIn, function (req, res) {
    /*res.send("test");*/
    var adi = req.body.adi;
    var resim = req.body.resim;
    var aciklama = req.body.aciklama;
    var olusturan = { id: req.user._id, username: req.user.username }

    var yenicommunity = { adi: adi, resim: resim, aciklama: aciklama, olusturan: olusturan };
    /*community.push(yenicommunity);*/

    //yeni community olustur ve db'ye kaydet
    community.create(yenicommunity, function (err, yeniOlusturulmuscommunity) {
        if (err) {
            console.log(err);
            res.redirect("/community");
        } else {
            res.redirect("/community");
        }
    });

});

router.get("/community/yeni", isLoggedIn, function (req, res) {
    res.render("community/yeni");
});

router.get("/community/:id", function (req, res) {
    community.findById(req.params.id).populate("yorumlar").exec(function (err, bulunancommunity) {
        if (err) {
            console.log(err);
        } else {
            res.render("community/goster", { community: bulunancommunity });
        }
    });

});


router.delete("/community/:id", isLoggedIn, function (req, res) {
    community.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/list");
        } else {
            res.redirect("/list");
        }
    })
});


router.get("/community/:id/yorumlar/yeni", isLoggedIn, function (req, res) {
    community.findById(req.params.id, function (err, bulunancommunity) {
        if (err) {
            console.log(err);
        } else {
            res.render("yorumlar/yeni", { community: bulunancommunity });
        }
    });
});

router.post("/community/:id/yorumlar", isLoggedIn, function (req, res) {
    community.findById(req.params.id, function (err, bulunancommunity) {
        if (err) {
            console.log(err);
            res.redirect("/community");
        } else {
            Yorum.create(req.body.yorum, function (err, yorum) {
                yorum.yazar.id = req.user._id;
                yorum.yazar.username = req.user.username;
                yorum.save();

                bulunancommunity.yorumlar.push(yorum);
                bulunancommunity.save();
                res.redirect('/community/' + bulunancommunity._id);
            });
        }
    });
});

router.get("/list", isLoggedIn, function (req, res) {
    //communityi database'den al
    community.find({}, function (err, communityDB) {
        if (err) {
            console.log(err);
        } else {
            console.log("*******************community********************");
            console.log(communityDB);
            res.render("community/list", { community: communityDB });
        }
    });
    /*res.render("community", {community:community})*/
});















function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/signin");
}


module.exports = router;
