import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Message from './Message';

export default function Search({ flights, setSelectedFlight }) {
    const [departureCity, setDepartureCity] = useState('');
    const [error, setError] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (departureCity === '' && arrivalCity === '') {
            window.location.reload();
            return
        }
        if (departureCity === '' || arrivalCity === '') {
            setError('Please fill both fields')
            return;
        }
        try {
                 const res = await axios.get(
                     `http://localhost:5002/search?departure_city=${departureCity}&arrival_city=${arrivalCity}`,
                     {
                         withCredentials: true
                     }
                 );
                 if (res.status !== 200) {
                     throw new Error(
                         `Failed to fetch data with status: ${res.status}`
                     );
                 } else {
                     setSelectedFlight(res.data.result);
                     setError('')
                 }
                 setDepartureCity('');
                 setArrivalCity('');
            
     
        } catch (err) {
             setError(err.message);
        }
        
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                gap:2
            }}
        >
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3, display: 'flex', columnGap: 2 }}
            >
                <Autocomplete
                    freeSolo
                    name="departure_city"
                    sx={{ backgroundColor: 'white', flex: 1 }}
                    disableClearable
                    options={[
                        ...new Set(
                            flights.map((flight) => flight.departure_city)
                        )
                    ]}
                    onChange={(event, value) => setDepartureCity(value)}
                    value={departureCity}
                    renderInput={(params) => (
                        <TextField
                            sx={{ flex: 1 }}
                            {...params}
                            label="From"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search'
                            }}
                        />
                    )}
                />
                <Autocomplete
                    sx={{ flex: 1, backgroundColor: 'white' }}
                    freeSolo
                    name="arrival_city"
                    disableClearable
                    options={[
                        ...new Set(flights.map((flight) => flight.arrival_city))
                    ]}
                    onChange={(event, value) => setArrivalCity(value)}
                    value={arrivalCity}
                    renderInput={(params) => (
                        <TextField
                            sx={{ flex: 1 }}
                            {...params}
                            label="To"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search'
                            }}
                        />
                    )}
                />
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Search
                </Button>
            </Box>
            {error && <Message errorText={error} severity={'error'} />}
        </Box>
    );
}

Search.propTypes = {
    setSelectedFlight:PropTypes.func,
    flights: PropTypes.arrayOf(
        PropTypes.shape({
            departure_city: PropTypes.string,
            arrival_city: PropTypes.string
        })
    ).isRequired
};