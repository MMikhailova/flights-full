import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
const drawerWidth = 240;
const navItems = ['Home','Connection', 'Account'];

function NavBar(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{ textAlign: 'center', width: '100%', height: '100px' }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '10vh'
                }}
            >
                <img
                    alt=""
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '15vh'
                    }}
                
                ></img>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', my: '150px', zIndex: 1 }}>
            <CssBaseline />
            <AppBar
                component="nav"
                sx={{
                    p: 0,
                    borderBottom: 'none', // Remove the bottom border
                    boxShadow: 'none', // Remove any box shadow
                    backgroundColor: 'transparent'
                }}
                elevation={0}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            width: '200px',
                            height: '150px'
                        }}
                    ></Box>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                sx={{ color: '#fff', mx: 2 }}
                                onClick={() => {
                                    item === 'Connection' &&
                                        navigate('/connection');
                                    item === 'Home' && navigate('/');
                                    item === 'Account' && navigate('/account');
                                }}
                            >
                                {item === 'Connection' ? (
                                    <LoginIcon />
                                ) : item === 'Account' ? (
                                    <PersonSearchIcon />
                                ) : (
                                    item
                                )}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

export default NavBar;
