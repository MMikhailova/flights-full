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
import { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message.jsx';
import { useNavigate } from 'react-router-dom';
import validateEmail from '../utils/validateEmail';
import validatePassword from '../utils/validatePassword';
import matchPasswords from '../utils/checkMatch';
import DrawerAppBar from '../components/NavBar';
import IsLoggedContext from '../context/isLogged.js';
import { useContext } from 'react';

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
              Fly with me
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

function SignUp() {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: ''
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
        const isPasswordMatch = matchPasswords(
            formData.password,
            formData.rePassword
        );
        if ((isEmailValid, isPasswordValid, isPasswordMatch)) {
            try {
                await postRegister(formData);

                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    rePassword: ''
                });
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError(
                'Some data is not valid. Check email, password or repeated'
            );
        }
    };

    const postRegister = async (formData) => {
        try {
            const res = await axios.post(
                'http://localhost:5002/register',
                formData,
                { withCredentials: true }
            );
            if (res.status !== 201) {
                throw new Error('Error while creating a new user');
            }
            if (res.data.success) {
                data.setRegistered(true)
                navigate('/connection');
            }
        } catch (err) {
            setError(err.message);
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
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
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
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="rePassword"
                                        label="Repeat Password"
                                        type="password"
                                        id="rePassword"
                                        autoComplete="new-password"
                                        value={formData.rePassword}
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
                                Sign Up
                            </Button>
                            {error && (
                                <Message errorText={error} severity={'error'} />
                            )}
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button
                                        onClick={() =>
                                            data.setRegistered(true)
                                        }
                                        variant="button"
                                    >
                                        Already have account? Log In
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
export default SignUp;
