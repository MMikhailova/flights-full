import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validateEmail from '../utils/validateEmail';
import validatePassword from '../utils/validatePassword';
import IsLoggedContext from '../context/isLogged.js';
import Message from '../components/Message';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="/">
                Magic Book
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

function Login() {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const data = useContext(IsLoggedContext);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isEmailValid = validateEmail(formData.email);
        const isPasswordValid = validatePassword(formData.password);

        if ((isEmailValid, isPasswordValid)) {
            try {
                await postLogin(formData);
                setFormData({
                    email: '',
                    password: ''
                });
            } catch (err) {
                setError(err.status);
            }
        } else {
            setError('Some data is not valid. Check email or password');
        }
    };

    const postLogin = async (formData) => {
        try {
            const res = await axios.post(
                'http://localhost:5002/login',
                formData,
                { withCredentials: true }
            );
            if (res.status !== 200) {
                throw new Error('Error while log in');
            }
            if (res.data.success) {
                data.setIsLogged(true);
                navigate('/');
            }
        } catch (err) {
            setError(err.status);
            data.setRegistered(false)
        }
    };
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                             p:3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor:"white"
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
        
                            {error && (
                                <Message errorText={error} severity={'error'} />
                            )}
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button
                                        onClick={() =>
                                            data.setRegistered(false)
                                        }
                                        variant="button"
                                    >
                                        Do not have an account yet? Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Login;
