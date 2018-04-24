
const mongoose = require("mongoose"),
    express = require("express"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    User = require("./models/userModel"),
    bodyParser = require("body-parser"),
    favicon = require('serve-favicon'),
    path = require('path'),
    methodOveride = require('method-override'),   
    app = express();


//Routes
const indexRoutes = require("./routes/indexRoutes"),
    haberRoutes = require("./routes/haberRoutes"),
    adminRoutes = require("./routes/adminRoutes"),
    moviesRoutes = require("./routes/moviesRoutes"),
    dataRoutes = require('./routes/dataRoutes'),
    tvRoutes = require('./routes/tvRoutes'),
    communityRoutes= require('./routes/communityRoutes'),
    gameRoutes = require('./routes/gameRoutes');

//App Config

mongoose.connect("mongodb://fulvus:swdeneme@ds227459.mlab.com:27459/sw");
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOveride("_method"));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Passport Config
app.use(require("express-session")({
    secret: "bu bizim guvenlik cumlemizdir",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Share current user info within all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


app.use(indexRoutes);
app.use(adminRoutes);
app.use(haberRoutes);
app.use(moviesRoutes);
app.use(dataRoutes);
app.use(tvRoutes);
app.use(gameRoutes);
app.use(communityRoutes);


app.listen(process.env.PORT);