import React, { useState } from 'react';
import '../CSS/Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token); // set the token
                localStorage.setItem('userEmail',formData.email); // set user email
                navigate('/');
            }
            else if(res.status === 404 || res.status === 401) {
                alert(data.message);
            }
            else{
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            navigate('/login');
        }

    };

    // console.log('FD', formData)

    return (
        <div className='bgg'>
            <form onSubmit={handleSubmit} className='form1'>
                <h1 style={{ paddingLeft: '0rem', color: 'black' }}>Login</h1>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className='loginbtn'>Login</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default Login;
