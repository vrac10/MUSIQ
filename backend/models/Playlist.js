import mongoose from 'mongoose';

const Playlist = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    tracks : [{
        type : mongoose.Types.ObjectId,
        ref : "Song",
        required : true
    }],
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    }
});

const PlaylistModel = mongoose.model('Playlist',Playlist);

export default PlaylistModel;