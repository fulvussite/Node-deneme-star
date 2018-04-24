const express = require('express'),
    
    game = require('../models/gameModels'),
    router = express.Router();


router.get('/addgame', isLoggedIn, (req, res) => {
    res.render('game/addgame');
});

router.get('/game', (req, res) => {
    game.find({}, (err, foundgame) => {
        if (err) {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        } else {
            console.log("=======================ALLL gameSSS ===================");
            res.render('game/game', { foundgame: foundgame });
        }

    })

});

router.post('/addgame', isLoggedIn, (req, res) => {
    let title = req.body.data.title;
    let image = req.body.data.image;
    let icerik = req.body.data.icerik;
    let content = req.body.data.content;


    let newgame = { title: title, image: image, content: content, icerik: icerik };

    game.create(newgame)
        .then((newgame) => {
            console.log(newgame);
            res.status(201).json(newgame);
        })
        .catch((err) => {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
            res.send(err);
        });

});


router.get('/games/:gameId', (req, res) => {
    game.findById(req.params.gameId)
        .then((foundgame) => {
            res.render("game/showgame", { foundgame: foundgame });
        })
        .catch((err) => {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
            res.send(err);
        });
});

router.delete("/games/:gameId", isLoggedIn, (req, res) => {
    game.findByIdAndRemove(req.params.gameId, (err) => {
        if (err) {
            console.log(err)
            res.redirect("/gamelist");
        } else {
            res.redirect("/gamelist");
        }
    });
});
router.get('/gamelist', (req, res) => {
    game.find({}, (err, foundgame) => {
        if (err) {
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        } else {
            console.log("=======================ALLL gameSSS ===================");
            res.render('game/gamelist', { foundgame: foundgame });
        }

    })

});




router.get("/testing", (req, res) => {
    game.find()
        .then((foundgames) => {
            res.json(foundgames);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});



router.get("/games/:gameId/editgame",(req, res )=> {
    game.findById(req.params.gameId, (err, editgame) =>{
        if (err) {
            console.log(err)
            res.redirect('game/gamelist');
        } else{
            res.render('game/editgame', { game:editgame})
        }
    })
})

router.put("/games/:id" , (req, res) => {
    game.findByIdAndUpdate(req.params.id, req.body.game, (err, updategame) =>{
        if(err){
            res.redirect("/gamelist")
        } else{
            res.redirect("/games/" + req.params.gameId)
        }
    })
})














function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/signin");
}


module.exports = router;
