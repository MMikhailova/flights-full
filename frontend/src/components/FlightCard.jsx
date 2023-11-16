import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Box, Stack, CardActionArea } from '@mui/material';
import splitDate from '../utils/splitDate';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LinearProgress from '@mui/material/LinearProgress';

export default function FlightCard({ flight }) {
    return (
        <Card sx={{ height: '200px', width: '80vw' }}>
            <CardActionArea
                sx={{
                    display: 'flex',
                    height: '100%',
                    gap: 2,
                    flexWrap: 'nowrap',
                    p: 5
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        width: '10%',
                        textAlign: 'center',
                        borderColor: 'grey',
                        borderWidth: '2px'
                    }}
                >
                    <Typography variant="h5">{flight.price}€</Typography>
                    <Typography>{flight.airline}</Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography>{splitDate(flight.departure_time)}</Typography>
                    <Typography variant="h6" color={'darkblue'}>
                        {flight.departure_city}
                    </Typography>
                </Stack>
                <Stack spacing={2} alignItems={'center'}>
                    <FlightTakeoffIcon />
                    <Typography>{flight.departure_airport}</Typography>
                </Stack>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography textAlign={'center'}>
                        Duration {Math.ceil(flight.duration)}h
                    </Typography>
                    <LinearProgress />
                </Box>
                <Stack spacing={2} alignItems={'center'}>
                    <FlightLandIcon />
                    <Typography>{flight.arrival_airport}</Typography>
                </Stack>
                <Stack spacing={2} alignItems={'center'}>
                    <Typography>{splitDate(flight.arrival_time)}</Typography>
                    <Typography variant="h6" color={'darkblue'}>
                        {flight.arrival_city}
                    </Typography>
                </Stack>
            </CardActionArea>
        </Card>
    );
}

FlightCard.propTypes = {
    flight: PropTypes.shape({
        flight_number: PropTypes.string,
        airline: PropTypes.string,
        departure_city: PropTypes.string,
        departure_airport: PropTypes.string,
        arrival_city: PropTypes.string,
        arrival_airport: PropTypes.string,
        departure_time: PropTypes.string,
        arrival_time: PropTypes.string,
        duration: PropTypes.number,
        price: PropTypes.number
    })
};
