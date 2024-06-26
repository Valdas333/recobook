import {useContext, useState} from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAddBook = () => {
       navigate("add/book");
    };
    const handleAddCategory = () => {
        navigate("category/add")
    };
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Book app
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
                    <Button aria-controls="books-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
                        Books
                    </Button>
                    <Menu
                        id="books-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Book 1</MenuItem>
                        <MenuItem onClick={handleClose}>Book 2</MenuItem>
                        <MenuItem onClick={handleClose}>Book 3</MenuItem>
                    </Menu>
                    <Button color="inherit" onClick={handleAddBook}>Add Book</Button>
                    <Button color="inherit" onClick={handleAddCategory}>Add Category</Button>

                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;

