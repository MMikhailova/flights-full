import { Autocomplete, Box, Button, Container, TextField } from '@mui/material';
import NavBar from '../components/NavBar';
import IsLoggedContext from '../context/isLogged';
import { useContext, useState } from 'react';
import Message from '../components/Message';
import axios from 'axios';

const PersonalAccount = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [flight, setFlight] = useState({});
    const [editedFlight, setEditedFlight] = useState({});
    const [error, setError] = useState('');
    const data = useContext(IsLoggedContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (flightNumber === '') {
            setError('Please choose a flight number that you want to update');
            return;
        }
        try {
            const res = await axios.get(
                `http://localhost:5002/search/${flightNumber}`,
                {
                    withCredentials: true
                }
            );
            if (res.status !== 200) {
                throw new Error(
                    `Failed to fetch data with status: ${res.status}`
                );
            } else {
                setFlight(res.data.result);
                setEditedFlight(res.data.result); // Set the initial edited flight state
                setError('');
            }
            setFlightNumber('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedFlight({
            ...editedFlight,
            [name]: value
        });
    };
    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5002/update-fight/${flight.flight_number}`,
                editedFlight,
                { withCredentials: true }
            );
            if (res.status !== 200) {
                throw new Error('Error while updating a flight');
            }
            // Optionally, you can update the flight state after a successful update
            setFlight(editedFlight);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

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
                <Box
                    sx={{
                        width: '30%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 3,
                            display: 'flex',
                            columnGap: 2
                        }}
                    >
                        <Autocomplete
                            freeSolo
                            name="flight_number"
                            sx={{ backgroundColor: 'white', flex: 1 }}
                            disableClearable
                            options={[
                                ...new Set(
                                    data.flights.map(
                                        (flight) => flight.flight_number
                                    )
                                )
                            ]}
                            onChange={(event, value) => setFlightNumber(value)}
                            value={flightNumber}
                            renderInput={(params) => (
                                <TextField
                                    sx={{ flex: 1 }}
                                    {...params}
                                    label="Flight number"
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

                    {/* Display Form with Flight Details */}
                    {Object.keys(flight).length > 0 && (
                        <Box
                            component="form"
                            noValidate
                            sx={{
                                mt: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2
                            }}
                        >
                            <TextField
                                label="Airline"
                                name="airline"
                                value={editedFlight.airline || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Departure City"
                                name="departure_city"
                                value={editedFlight.departure_city || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Departure Airport"
                                name="departure_airport"
                                value={editedFlight.departure_airport || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Arrival Airport"
                                name="Arrival_airport"
                                value={editedFlight.arrival_airport || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Arrival City"
                                name="Arrival_city"
                                value={editedFlight.arrival_city || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Departure Time"
                                name="Departure_time"
                                value={editedFlight.departure_time || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Arrival Time"
                                name="Arrival_date"
                                value={editedFlight.arrival_time || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                label="Duration"
                                name="Duration"
                                value={editedFlight.duration || ''}
                                onChange={handleEditChange}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {/* Button to update changes */}
                            <Button variant="contained" onClick={handleUpdate}>
                                Update
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default PersonalAccount;
