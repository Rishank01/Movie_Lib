import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import '../CSS/ShowPlaylist.css';

const ShowPlaylist = ({ playlists, setPlaylist}) => {
    const [visiblePlaylistId, setVisiblePlaylistId] = useState(null);
    const [movieDetails, setMovieDetails] = useState({});

    const API_KEY = process.env.REACT_APP_API_KEY;

    const fetchMovieDetails = async (imdbID) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    };

    const togglePlaylistVisibility = async (playlistId) => {
        if (visiblePlaylistId === playlistId) {
            setVisiblePlaylistId(null);
        } else {
            setVisiblePlaylistId(playlistId);

            const playlist = playlists.find((p) => p._id === playlistId);
            if (playlist) {
                const details = await Promise.all(
                    playlist.movies.map(async (imdbID) => {
                        if (!movieDetails[imdbID]) {
                            const movieDetail = await fetchMovieDetails(imdbID);
                            return { imdbID, ...movieDetail };
                        }
                        return movieDetails[imdbID];
                    })
                );

                const newMovieDetails = details.reduce((acc, detail) => {
                    acc[detail.imdbID] = detail;
                    return acc;
                }, {});

                setMovieDetails((prevDetails) => ({
                    ...prevDetails,
                    ...newMovieDetails,
                }));
            }
        }
    };

    const deletePlaylist = async (playlistId) => {
        try {
            const response = await fetch(`https://movie-lib-api.onrender.com/playlist/${playlistId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPlaylist(playlists.filter((playlist) => playlist._id !== playlistId));
                // console.log(`Deleted playlist with id: ${playlistId}`);
            } else {
                console.error('Failed to delete playlist');
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    const deleteMovie = async (playlistId, imdbID) => {
        try {
            const response = await fetch(`https://movie-lib-api.onrender.com/playlist/${playlistId}/movies/${imdbID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPlaylist(playlists.map(playlist => {
                    if (playlist._id === playlistId) {
                        return { ...playlist, movies: playlist.movies.filter(movieId => movieId !== imdbID) };
                    }
                    return playlist;
                }));
                console.log(`Deleted movie with id: ${imdbID} from playlist with id: ${playlistId}`);
            }  else {
                console.error('Failed to delete movie');
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };


    return (
        <div className="playlist-container">
            <p className='headdshow'> PLAYLISTS</p>
            {playlists.map((playlist) => (
                <div key={playlist._id} className="playlist">
                    <div className="playlist-header">
                        <h3 className='head033'>{playlist.title}</h3>
                        <div className="icon-group">
                            <FaTrash className="trash-icon" onClick={() => deletePlaylist(playlist._id)} />
                        </div>
                    </div>
                    
                    <button onClick={() => togglePlaylistVisibility(playlist._id)} className='togglebtn'>
                        {visiblePlaylistId === playlist._id ? 'Hide Playlist' : 'Show Playlist'}
                    </button>
                    <hr/>
                    {visiblePlaylistId === playlist._id && (
                        <div className="movie-list">
                            {playlist.movies.length === 0 ? (
                                <p>This playlist is empty</p>
                            ) : (
                                playlist.movies.map((imdbID, index) => (
                                    <div key={index} className="movie">
                                        {movieDetails[imdbID] ? (
                                            <div className="movie-card">
                                                <img src={movieDetails[imdbID].Poster} alt={movieDetails[imdbID].Title} />
                                                <p>{movieDetails[imdbID].Title}</p>
                                                <p>{movieDetails[imdbID].Year}</p>
                                                <button className="dell" onClick={() => deleteMovie(playlist._id, imdbID)}>Delete</button>
                                            </div>
                                        ) : (
                                            <p className='loading'>Loading...</p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ShowPlaylist;