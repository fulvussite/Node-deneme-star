const express       = require('express'),
      User          = require('../models/userModel'),
      passport      = require("passport"),
      router        = express.Router();



router.get("/admin", isLoggedIn, (req, res)=>{
    res.render("admin/admin",{});
});

router.get("/signin", (req, res)=>{
    res.render("admin/signin");
});

router.post("/signin", passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/signin"
    }),(req, res)=>{
});

router.get("/signup",isLoggedIn, (req, res)=>{
    res.render("admin/signup");
});

router.post("/signup",isLoggedIn,(req, res)=>{
 
  let newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/");
        });
    })
});

router.get("/signout", (req, res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports = router;
