import { Avatar, Box, Button, Container, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import IsLoggedContext from "../context/isLogged";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Message from "./Message.jsx";
import CssBaseline from '@mui/material/CssBaseline';


const defaultTheme = createTheme();

const LogOut = () => {
    const [error, setError] = useState('');
    const data = useContext(IsLoggedContext);
   
    const handleClick = async (event) => {
             event.preventDefault();
        try {
            const res = await axios.post('http://localhost:5002/logout',
                { withCredentials: true
            });
            if (res.status !== 200) {
                throw new Error('Failed to log out');
            }
            data.setIsLogged(false);
            data.setRegistered(false);
          
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            {error && <Message errorText={error} severity={'error'} />}
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
                            <LogoutIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log Out
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleClick}
                            sx={{ mt: 3 }}
                        >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                           Click to Log Out
                            </Button>
    
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default LogOut
