const   express= require('express'),
        movies= require('../models/moviesModels'),
        router= express.Router();


router.get('/addmovies', isLoggedIn, (req, res)=>{
    res.render('movies/addmovies');
});

router.get('/movies', (req, res) =>{
    movies.find({},(err, foundmovies) =>{
        if(err){
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        }else{
            console.log("=======================ALLL moviesSSS ===================");
            res.render('movies/movies',{foundmovies:foundmovies});
        }

    })
   
});

router.delete("/moviess/:moviesId", isLoggedIn, (req, res) => {
    movies.findByIdAndRemove(req.params.moviesId, (err) => {
        if (err) {
            console.log(err)
            res.redirect("/movieslist");
        } else {
            res.redirect("/movieslist");
        }
    });
});

router.post('/addmovies',isLoggedIn, (req, res)=>{
    let title= req.body.data.title;
    let image = req.body.data.image;
    let icerik = req.body.data.icerik;
    let content = req.body.data.content;
    

    let newmovies = { title:title, image:image, content:content,  icerik:icerik};

    movies.create(newmovies)
    .then((newmovies)=>{
        console.log(newmovies);
        res.status(201).json(newmovies);
    })
    .catch((err)=>{
        console.log("=======================ERROR ERROR ERROR ===================");
        console.log(err);
        res.send(err);
    });
    
});


router.get('/moviess/:moviesId', (req, res)=>{
    movies.findById(req.params.moviesId)
    .then((foundmovies)=>{
        res.render("movies/showmovies", {foundmovies:foundmovies});
    })
    .catch((err)=>{
        console.log("=======================ERROR ERROR ERROR ===================");
        console.log(err);
        res.send(err);
    });
});

router.get('/movieslist', (req, res) =>{
    movies.find({},(err, foundmovies) =>{
        if(err){
            console.log("=======================ERROR ERROR ERROR ===================");
            console.log(err);
        }else{
            console.log("=======================ALLL moviesSSS ===================");
            res.render('movies/movieslist',{foundmovies:foundmovies});
        }

    })
   
});

router.get("/testing", (req, res)=>{
    movies.find()
    .then((foundmoviess)=>{
        res.json(foundmoviess);
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
