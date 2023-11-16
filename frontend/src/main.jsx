import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './main.css';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
    typography: {
        fontFamily: "'Edu TAS Beginner'",
        h3: {
            color: '#d6af4f',
            fontWeight: 600,
            fontStyle: 'italic'
        },
        h4: {
            color: '#d6af4f',
            fontWeight: 400,
            fontStyle: 'oblique'
        }
    }
});
theme = responsiveFontSizes(theme);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
