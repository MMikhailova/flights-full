import { useContext } from 'react';
import Login from '../components/Login';
import LogOut from '../components/LogOut';
import IsLoggedContext from '../context/isLogged.js';
import SignUp from '../components/SignUp';
import NavBar from '../components/NavBar';
import { Box, Container } from '@mui/material';

const Connection = () => {
    const data = useContext(IsLoggedContext);

    return (
        <Container maxWidth="xl" disableGutters>
          <Box
              sx={{
                  width: '100%',
                  height: '100vh',
                   position: 'relative',
                  padding: 0,
                  margin: 0,
                  backgroundImage: 'url(././sky.svg)',
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center', 
                  justifyContent: 'center' 
              }}
          >
            <NavBar />
            {!data.isRegistered ? (
                <SignUp />
            ) : !data.isLogged ? (
                <Login />
            ) : (
                <LogOut />
            )}
            </Box>
        </Container> 
    );
};

export default Connection;
