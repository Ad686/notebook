import React from 'react';
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'Login', link: '/login' },
  ];

  return (
    <div>
      <AppBar position="static" className="nav">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <Avatar src="https://th.bing.com/th/id/OIP.wcbDv7iS-zN6qHjfy0gL3QHaHa?w=177&h=180&c=7&r=0&o=5&pid=1.7" alt="Notebook" />
          </IconButton>

          <Typography
          className='note '
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            NOTEBOOK
          </Typography>

            {!localStorage.getItem('token')?
          <Hidden xsDown>
            {/* <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About
            </Button> */}
            <Button variant="outlined" component={Link} to="/login" color="error" className="mx-1"> 
              Login
            </Button>
            <Button variant="outlined" component={Link} to="/signup" color="success" className="mx-1">
              Signup
            </Button>
          </Hidden>
             :<Button variant="outlined" component={Link} to="/login" color="error" className="mx-1">
             Logout
           </Button>}
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer for small screens */}
      <Hidden smUp>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} >
          <List>
            {drawerItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.link} onClick={toggleDrawer}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Hidden>
    </div>
  );
}

export default Navbar;
