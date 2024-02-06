import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './Login.css';

function Login({setIsLoggedIn}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleCreateUserAndSendPassword = async () => {
        const response = await fetch('/api/create_user_and_send_password/');
        const data = await response.json();

        if (response.ok) {
            setUsername(data.username);
            setPassword(data.password);
            alert('User created and password sent');
        } else {
            alert('An error occurred. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            Cookies.set('isLoggedIn', 'true');
            setIsLoggedIn(true);
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <form onSubmit={handleSubmit} className="loginForm">
                    <label className="loginLabel">
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="loginInput" />
                    </label>
                    <br />
                    <label className="loginLabel">
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="loginInput" />
                    </label>
                    <br />
                    {error && <p className="loginError">{error}</p>}
                    <input type="submit" value="Log In" className="loginSubmit" />
                </form>
                <button onClick={handleCreateUserAndSendPassword} className="loginCreateUser">Create User and Send Password</button>
            </div>
        </div>
    );
}

export default Login;