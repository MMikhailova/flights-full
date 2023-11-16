import PropTypes from 'prop-types'

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Message({ errorText, severity }) {
  
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={severity}>{errorText}</Alert>
        </Stack>
    );
}
Message.propTypes = {
    errorText: PropTypes.string.isRequired,
    severity:PropTypes.string.isRequired
}



export default Message