const express=require('express');
const router=express();
const validateUser = require('../middlewares/Validate');

const {Create, Delete, Get, Update, GetById, DeleteMovieById} = require('../controllers/Playlist');

router.post('/create' , validateUser, Create);
router.delete('/:id' , Delete);
router.get('/get', Get);
router.put('/update/:id' , Update);
router.get('/:id' , GetById);
router.delete('/:playlistId/movies/:imdbID', DeleteMovieById);

module.exports=router;