import Song from '../models/Song.js'
import express from 'express';

const router = express();

router.post('/upload',async (req,res) => {
    const {name, thumbnail,track} = req.body;

    const newSongData = {name, thumbnail, track};

    const newSong = await Song.create(newSongData);

    return res.status(200).json(newSong.toJSON());
});

router.get('/:songName', async (req, res) =>{
    const songName = req.params.songName;

    const getSong = await Song.find({name : songName});

    if(!getSong){
        return res.status(404).json({err : 'Song not found'});
    }

    return res.status(200).json(getSong);

 })

export default router;
