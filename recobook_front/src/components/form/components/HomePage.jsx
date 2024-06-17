import { Typography, Button, AppBar, Toolbar, Grid, Drawer, ListItem, ListItemText, List } from '@mui/material';

export default function HomePage() {
    const logout = () => {
        //logout code here
    };

    const drawerItems = [

        {text: 'Dashboard', onClick: () => {/*dashboard page code here*/}},
        {text: 'Profile', onClick: () => {/*profile page code here*/}},
        {text: 'Categories', onClick: () => {/*categories page code here*/}},
        {text: 'Books', onClick: () => {/*books page code here*/}},
    ];
    console.log("dsfs");
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
                    <Typography variant="h4">
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