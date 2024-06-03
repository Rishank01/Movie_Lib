import React, { useState, useEffect } from 'react';
import '../CSS/Dialog.css';
import { useNavigate, Link } from 'react-router-dom';

function Dialog({ movie, onClose }) {
    const navigate = useNavigate();
    const [playlistName, setPlaylistName] = useState('');
    const [existingPlaylists, setExistingPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('token') !== null);
    }, []);

    const fetchPlaylists = async () => {
        try {
            const res = await fetch('https://movie-lib-api.onrender.com/playlist/get');
            if (res.ok) {
                const data = await res.json();
                setExistingPlaylists(data.data); 
            } else {
                throw new Error('Failed to fetch playlists');
            }
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    useEffect(() => {
        fetchPlaylists(); 
    }, []); 

    const handleCreateNewPlaylist = async (e) => {
        e.preventDefault();
        console.log('Creating new playlist:', playlistName, 'with movie:', movie);

        // Validate user
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (token === null) {
            alert('Log in to create a new playlist');
            navigate('/login');
        }

        const listData = {
            title: playlistName,
        };
        try {
            const res = await fetch('https://movie-lib-api.onrender.com/playlist/create', {
                method: 'POST',
                headers: { 
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(listData),
            });
            if (res.ok) {
                alert('Playlist created successfully');
                fetchPlaylists();
            }
            
        } catch (error) {
            console.error('Error creating playlist:', error);
            navigate('/movies');
        }
    };

    const handleAddToExistingPlaylist = async () => {
        try {
            const playlist = existingPlaylists.find(pl => pl._id === selectedPlaylist);
            console.log('Adding to existing playlist:', playlist, 'with movie:', movie);

            const data = movie;

            const res = await fetch(`https://movie-lib-api.onrender.com/playlist/update/${selectedPlaylist}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                alert('Movie added to playlist successfully');
            } else {
                throw new Error('Failed to add movie to playlist');
            }
        } catch (error) {
            console.error('Error adding movie to the playlist:', error);
        }
    };

    return (
        <div className="dialog-backdrop">
            <div className="dialog">
                <p style={{fontSize:'1.5rem', marginBottom:'2rem'}}>Add "<b>{movie.Title}</b>" to Playlist</p>
                {
                    isLoggedIn ? (
                        <div>
                            <div>
                                <p style={{textAlign:'left'}}>Create New Playlist</p>
                                <input
                                    type="text"
                                    value={playlistName}
                                    onChange={(e) => setPlaylistName(e.target.value)}
                                    placeholder="New playlist name"
                                    className='inputt'
                                />
                                <button onClick={handleCreateNewPlaylist} className='btncreate'><strong>+</strong></button>
                            </div>
                            <div>
                                <p style={{textAlign:'left'}}>Or Add to Existing Playlist</p>
                                <select
                                    value={selectedPlaylist}
                                    onChange={(e) => setSelectedPlaylist(e.target.value)}
                                    className='selectPlaylist'
                                >
                                    <option value="">Select a playlist</option>
                                    {existingPlaylists.map((playlist) => (
                                        <option key={playlist._id} value={playlist._id}>
                                            {playlist.title}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={handleAddToExistingPlaylist} className='btnExist'>
                                    Add to Playlist
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p><Link to='/login'>Login</Link> first to add movie to existing playlist or to create a new playlist</p>
                    )
                }
                <button className="close-button-2" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default Dialog;