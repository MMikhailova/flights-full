import { Box, Container} from '@mui/material';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import FlightCard from '../components/FlightCard';
import Search from '../components/Search';
import { useContext } from 'react';
import IsLoggedContext from '../context/isLogged';

const Home = () => {
  
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [selectedFlight, setSelectedFlight] = useState([])
  const data = useContext(IsLoggedContext);

        const getFlights = async () => {
            try {
                const res = await axios.get('http://localhost:5002/', {
                    withCredentials: true
                });
                if (res.status !== 200) {
                    throw new Error(
                        `Failed to fetch data with status: ${res.status}`
                    );
                } else {
                    data.setFlight(res.data.result);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
     getFlights();
  
    return (
        <>
            {loading && <Loading />}
            {error && <p>{error}</p>}
            <Container
                maxWidth="xl"
                disableGutters
                sx={{ backgroundColor: '#FE943F', height: '5000px', pb: 4 }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '40vh',
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
                    <Search
                        flights={data.flights}
                        setSelectedFlight={setSelectedFlight}
                    />
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        mt: 3,
                        overflowX: 'hidden'
                    }}
                >
                    {selectedFlight.length > 0
                        ? selectedFlight.map((flight) => (
                              <FlightCard
                                  key={flight.flight_number}
                                  flight={flight}
                              />
                          ))
                        : data.flights.map((flight) => (
                              <FlightCard
                                  key={flight.flight_number}
                                  flight={flight}
                              />
                          ))}
                </Box>
            </Container>
        </>
    );
};

export default Home;
