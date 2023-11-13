import mongoose from "mongoose";

const Song = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    track : {
        type : String,
        required : true
    },
    artist : {
        type : String,
        required : true
    }
});

const SongModel = mongoose.model("Song", Song);

export default SongModel;