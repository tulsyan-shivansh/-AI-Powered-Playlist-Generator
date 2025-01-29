import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/signup', { email, password });
            navigate('/login');
        } catch (err) {
            console.error('Error signing up:', err);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Signup
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
            </form>
        </Container>
    );
};

export default Signup;