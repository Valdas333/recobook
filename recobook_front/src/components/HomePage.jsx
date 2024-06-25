import { Typography, Button, AppBar, Toolbar, Grid, Drawer, ListItem, ListItemText, List } from '@mui/material';
import AuthService from "./utils/AuthService.js";
import {useNavigate} from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout();
        navigate('/login');
    }


    const drawerItems = [
        // prideti kaires puses navbaro elementus
        {text: 'Dashboard', onClick: () => {/*dashboard page code here*/}},
        {text: 'Add Categories', onClick: () => {/*categories page code here*/}},
        {text: 'Add Books', onClick: () => {/*books page code here*/}},
    ];
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        My Application
                    </Typography>
                    <Typography>Welcome, User Name!</Typography>
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Drawer variant="permanent">
                    <List>
                        {drawerItems.map((item, index) => (
                            <ListItem button key={index} onClick={item.onClick}>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Grid item xs>
                    <Typography variant="h1">
                        Dashboard
                    </Typography>
                    {/* Dashboard content here */}
                </Grid>
            </Grid>
            <footer>
                <Typography>All rights reserved</Typography>
            </footer>
        </>
    );
};