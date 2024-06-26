import { Typography, Button, AppBar, Toolbar, Grid, Drawer, ListItem, ListItemText, List } from '@mui/material';
import AuthService from "./utils/AuthService.js";
import {useNavigate} from "react-router-dom";
import BookList from "./BookList.jsx";
import {AuthContext} from "./utils/AuthContext.jsx";
import {useContext} from "react";

export default function HomePage() {

    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout();
        navigate('/login');
    }


    const drawerItems = [
        // prideti kaires puses navbaro elementus
        {text: 'Dashboard', onClick: () => { navigate("/home")}},
        {text: 'Add Categories', onClick: () => { navigate("/category/add")}},
        {text: 'Add Books', onClick: () => {navigate ("/add/book")}},
    ];
    return (
        <>
            {/*<AppBar>*/}
            {/*    <Toolbar>*/}
            {/*        <Typography variant="h6" style={{ flexGrow: 1 }}>*/}
            {/*            My Application*/}
            {/*        </Typography>*/}
            {/*        <Typography>Welcome, User Name!</Typography>*/}
            {/*        <Button color="inherit" onClick={handleLogout}>*/}
            {/*            Logout*/}
            {/*        </Button>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            {/*<Grid container>*/}
            {/*    <Drawer variant="permanent">*/}
            {/*        <List>*/}
            {/*            {drawerItems.map((item, index) => (*/}
            {/*                <ListItem button key={index} onClick={item.onClick}>*/}
            {/*                    <ListItemText primary={item.text} />*/}
            {/*                </ListItem>*/}
            {/*            ))}*/}
            {/*        </List>*/}
            {/*    </Drawer>*/}
            {/*</Grid>*/}
            <BookList />
            <footer>
                <Typography>All rights reserved</Typography>
            </footer>
        </>
    );
};