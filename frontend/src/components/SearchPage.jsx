import React, { useState } from 'react';
import '../CSS/SearchPage.css';
import { useNavigate } from 'react-router-dom';


const SearchPage = ({setMovies}) => {
    const navigate = useNavigate();
    const apiKey = process.env.REACT_APP_API_KEY;

    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);
        setMovies([]);

        if (query.trim() === '') {
            setError('Please enter a movie name.');
            return;
        }

        const searchURL = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

        try {
            const response = await fetch(searchURL);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search);  // Update to handle list of movies
                navigate('/movies');
            } else {
                setError(data.Error);
            }
        } catch (error) {
            setError('An error occurred while fetching data.');
        }
    };

    return (
        <div className="search-page">
            <div className="search-container">
                <div style={{textAlign:'center', marginTop:'5rem'}}>
                    <b className='heading02'>Movie <span className = "Search-span">S</span>earch</b>
                    <p className='para01' >Your Next Favorite Show is Just a Click Away. Explore Now!</p>
                </div>
                <form className='form053' onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a movies and TV shows"
                    />
                     <button type="submit">Search</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default SearchPage;