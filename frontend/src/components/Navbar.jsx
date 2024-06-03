import React, { useState, useEffect } from 'react';
import logo from '../images/rishh_logo2.png';
import '../CSS/Navbar.css';


const Navbar = ({ setUserIsLoggedIn }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [username, setUserName] = useState("");

    const email1 = localStorage.getItem('userEmail');

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('token') !== null);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUser(email1);
        }
    }, [isLoggedIn]);


    const fetchUser = async (email) => {
        try {
            const res = await fetch(`https://movie-lib-api.onrender.com/user/${email}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            });

            if (res.ok) {
                const userData = await res.json();
                setUserName(userData.name);
            } else {
                console.error('Error fetching user:', res.status);
                return null
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserIsLoggedIn(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <h1>Cine<span className = "title-span">App</span></h1>
            </div>
            <div className="navbar-links">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login">Login</Link>
                        <a href="/signup">Signup</a>
                    </>
                ) : (
                    <div className='side-icons'>
                        <a href="/" style = {{paddingRight : "1.5rem"}}>{username}</a>
                        <button onClick={handleLogout} className='logOutbtn'>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
