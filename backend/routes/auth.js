import User from '../models/User.js'
import bcrypt from 'bcrypt';
import getToken from '../utils/token.js';
import express from 'express';

const router = express.Router()

router.post('/register', async (req, res) => {
    const {email, password, username} = req.body;

    // Check if there is a user with the same username already registered
    const user = await User.findOne({username: username});
    if(user){
        return res.status(301).json({err : "Username already exists"});
    }

    // If there is no user with the same username already registered then we create a new one

    const hashPass = await bcrypt.hash(password,10);
    const newUserData = {username, password: hashPass, email};
    const newUser = await User.create(newUserData);

    // We want the token of this user
    const token = await getToken(email,newUser);

    // We return the token to the frontend
    const userReturned = {...newUser.toJSON(),token};
    delete userReturned.password;
    return res.status(200).json(userReturned);

});

export default router;
