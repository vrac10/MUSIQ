import mongoose from "mongoose";

const User = new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        required : true
    }
});

const UserModel = mongoose.model('User', User);

export default UserModel;