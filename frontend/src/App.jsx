import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import IsLoggedContext from './context/isLogged';
import Home from './pages/Home';
import Connection from './pages/Connection';
import PersonalAccount from './pages/PersonalAccount';


function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [isRegistered, setRegistered] = useState(false);
     const [flights, setFlight] = useState([]);

    return (
        <div>
            <IsLoggedContext.Provider
                value={{
                    isLogged: isLogged,
                    setIsLogged: setIsLogged,
                    isRegistered: isRegistered,
                    setRegistered: setRegistered,
                    flights: flights,
                    setFlight: setFlight
                }}
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/connection" element={<Connection />} />
                        <Route
                            path="/account"
                            element={
                                isLogged ? <PersonalAccount /> : <Connection />
                            }
                        />
                    </Routes>
                </Router>
            </IsLoggedContext.Provider>
        </div>
    );
}

export default App;
