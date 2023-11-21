import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import authRoutes from './routes/auth.js';
import songRoutes from "./routes/search.js";
import playlistRoutes from "./routes/playlist.js";
import User from "./models/User.js";
import cors from 'cors';
const app = express();
const port = 8000;

const corsOptions = {
    origin: '*', 
    credentials: true,            // access-control-allow-credentials: true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());


mongoose
    .connect("mongodb+srv://vrachit106:" + process.env.MONGO_PASSWORD + "@cluster0.90wuxc7.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }
    )
    .then((x) => {
        console.log("Connected to Mongo");
    })
    .catch((err) => {
        console.log("Error connecting to Mongo");
    });
    


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyIsSupposedToBeSecret';
passport.use(new Strategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

app.get('/', async (req,res) => {
    res.send('hello')
})

app.use('/auth',authRoutes);
app.use('/song',songRoutes);
app.use('/playlist',playlistRoutes);

app.listen(port,() => {
    console.log('listening on port 8000');
})