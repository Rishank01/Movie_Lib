import React from 'react';
import Navbar from './Navbar';
import SearchPage from './SearchPage';
import { useEffect, useState } from 'react';
import ShowPlaylist from './ShowPlaylist';
import '../CSS/Home.css';

function HomePage({ setMovies, setUserIsLoggedIn, userIsLoggedIn }) {
    
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        setUserIsLoggedIn(localStorage.getItem('token') !== null);
    }, []);



    const fetchPlaylists = async () => {
        try {
            const res = await fetch('https://movie-lib-api.onrender.com/playlist/get');
            if (res.ok) {
                const data = await res.json();
                setPlaylist(data.data); 
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
    return (
        <div>
            <Navbar setUserIsLoggedIn={setUserIsLoggedIn} />
            <div id = "hero-section">
                <SearchPage setMovies={setMovies} />
            </div>
            <div id = "search-back-section">
                {userIsLoggedIn && <ShowPlaylist playlists={playlist} setPlaylist={setPlaylist} />}
            </div>
        </div>
    );
}

export default HomePage;
