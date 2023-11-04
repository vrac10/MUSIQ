import express from 'express';
import passport from 'passport';
import Song from '../models/Song.js';
import PlaylistModel from '../models/Playlist.js';


const router = express.Router();

router.post('/create', passport.authenticate('jwt',{session : false}), async (req, res) => {
    const currentUser = req.user;
    const {name, thumbnail , tracks} = req.body;
    const playlistData = {name , tracks , owner : currentUser._id , thumbnail};
    if(!name || !thumbnail || !tracks){
        return res.status(301).json({err: 'Insufficient data'});
    }

    const playlist = await PlaylistModel.create(playlistData);
    return res.status(200).json(playlist);
});


router.get('/get/playlist/:playlistId', passport.authenticate('jwt',{session : false}), async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await PlaylistModel.findOne({_id : playlistId});
    if(!playlist){
        return res.status(301).json({err : 'Playlist Not Found'});
    }

    return res.status(200).json(playlist);
})

router.get('/get/playlists', passport.authenticate('jwt',{session : false}), async (req, res) => {
    const user = req.user;
    const playlists = await PlaylistModel.find({owner : user.id});
    if(!playlists){
        return res.status(301).json({err : 'Playlists Not Found'});
    }

    return res.status(200).json(playlists);
})

router.post('/add/song',passport.authenticate('jwt', {session : false}), async (req,res) => {
    const currentUser = req.user;
    const {playlistId, songId} = req.body;
    const playlist = await PlaylistModel.findOne({_id : playlistId});
    if(!playlist){
        return res.status(301).json({err : "Playlist not found"});
    }
    if(!playlist.owner.equals(currentUser._id)){
        return res.status(400).json({err : "Not allowed"});
    }

    const song = await Song.findOne({_id : songId});
    if(!song){
        return res.status(304).json({err : "Song not found"});
    }

    playlist.tracks.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);

})  

export default router;

