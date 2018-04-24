const   express= require('express'),
        Haber= require('../models/haberModels'),
        router= express.Router();


router.get('/addhaber', isLoggedIn, (req, res)=>{
    res.render('haber/addhaber',{title: 'Haber Ekle'});
});

router.get('/haber', (req, res) =>{
    Haber.find({},(err, foundHaber) =>{
        if(err){
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        }else{
            console.log("=======================ALLL HABERSSS ===================");
            res.render('haber/haber',{foundHaber:foundHaber});
        }

    })
   
});

router.post('/addhaber',isLoggedIn, (req, res)=>{
    let title= req.body.data.title;
    let image = req.body.data.image;
    let icerik = req.body.data.icerik;
    let content = req.body.data.content;
   

    let newHaber = { title:title, image:image, content:content,  icerik:icerik };

    Haber.create(newHaber)
    .then((newHaber)=>{
        console.log(newHaber);
        res.status(201).json(newHaber);
    })
    .catch((err)=>{
        console.log("=======================ERROR ERROR ERROR ===================");
        console.log(err);
        res.send(err);
    });
   
});

router.delete("/Habers/:HaberId", isLoggedIn, (req, res) => {
    Haber.findByIdAndRemove(req.params.HaberId, (err) => {
        if (err) {
            console.log(err)
            res.redirect("/haberlist");
        } else {
            res.redirect("/haberlist");
        }
    });
});

router.get('/Habers/:HaberId', (req, res)=>{
    Haber.findById(req.params.HaberId)
    .then((foundHaber)=>{
        res.render("haber/showHaber", {foundHaber:foundHaber});
    })
    .catch((err)=>{
        console.log("=======================ERROR ERROR ERROR ===================");
        console.log(err);
        res.send(err);
    });
});

router.get('/haberlist', (req, res) =>{
    Haber.find({},(err, foundHaber) =>{
        if(err){
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        }else{
            console.log("=======================ALLL HABERSSS ===================");
            res.render('haber/haberlist',{foundHaber:foundHaber});
        }

    })
   
});

router.get("/testing", (req, res)=>{
    Haber.find()
    .then((foundHabers)=>{
        res.json(foundHabers);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    }); 
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}


module.exports= router;
