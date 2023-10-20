import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const getToken = async (user) => {
    const token = jwt.sign({identifier : user._id}, "thisKeyIsSupposedToBeSecret");
    return token;
}

export default getToken;