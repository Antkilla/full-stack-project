import React, { useState } from 'react'
import axios from 'axios';

const Login = ({ LogOn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Send login request to backend
            const response = await axios.post('http://localhost:3001/login', { username, password });

            // Assuming the backend sends a token upon successful login (haven't completed in the backend yet)
            const token = response.data.token;

            // Notify the parent component about the successful login and pass the token
            LogOn(token);
        }   catch (error)   {
            console.error('Login Failed:', error.message);
            // handle login failure as well shows the message of what yo wrote in the string
        }
    };

    return (
        <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
