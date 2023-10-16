import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const getToken = async () => {
    const token = jwt.sign({identifier : UserModel._id}, "thisKeyIsSupposedToBeSecret");
    return token;
}

export default getToken;