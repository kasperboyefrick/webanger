const express = require("express");
const session = require("express-session");

const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const axios = require('axios');
const cors = require("cors");
const allowedOrigins = ["http://localhost:3000"]

const db = require("better-sqlite3")("webanger.db");
db.pragma('journal_mode = WAL');

const PORT = 8080;
const CALLBACK = "/auth/callback";

require("dotenv").config();

passport.serializeUser(function (user, done) {
    done(null, user.userId);
});

passport.deserializeUser(function (userId, done) {
    const row = db.prepare("SELECT * FROM users WHERE user_id = ?").get(userId);
    done(null, {userId : userId, name : row.name, spotifyId : row.spotify_id});
});

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}${CALLBACK}`
}, function (accessToken, refreshToken, expires_in, profile, done) {
    const spotifyId = profile.id
    const row = db.prepare("SELECT * FROM users WHERE spotify_id = ?").get(spotifyId);
    if(row){
        process.nextTick(function () {
            return done(null, {userId: row.user_id, name: row.name, spotifyId: spotifyId });
        });
    }
    else {
        process.nextTick(function (){
            return done("you are not a member!");
        });
    }
}));

const app = express();

app.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({secret: "test secret password", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.send("hello");
    console.log(req.user)
});

app.get("/api/home", (req, res) => {
});

app.post("/api/schedule", (req, res) => {
    console.log(req.body)
    res.send(req.body)
});

app.get("/api/bangerlist", (req, res) => {

    const accessToken = req.user.accessToken;
    const userId = req.user.profile.id;
    const apiUrl = `https://api.spotify.com/v1/me/playlists`;

    axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(response => {
        const playlists = response.data.items; // List of playlists
        console.log(playlists)
        res.json({playlists});
        // Process and display the playlists on your website
    }).catch(error => {
        // Handle errors
    });
});

app.get("/api/user", ensureAuthenticated, (req, res) => {
    res.json(req.user);
});

app.get('/auth/spotify',
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private', 'playlist-read-private', 'playlist-read-collaborative'],
        //showDialog: true,
    })
);


app.get( CALLBACK, passport.authenticate('spotify', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect(process.env.PROXY);
    }
);

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server started again on port ${PORT}`);
})

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}
