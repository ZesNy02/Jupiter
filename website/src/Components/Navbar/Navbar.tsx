import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';
import logo from '../../assets/logo.png';
import Document from "../../pages/Document.tsx";
import About from "../../pages/About.tsx";
import Start from "../../pages/Start.tsx";
import Installation from "../../pages/Installation.tsx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("Start");

    const renderPage = () => {
        switch (page) {
            case "Start":
                return <Start />;
            case "Document":
                return <Document />;
            case "About":
                return <About />;
            case "Installation":
                return <Installation />;
        }
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const handlePageChange = (newPage: string) => {
        setPage(newPage);
        setIsOpen(false);
    };

    const menuItems = [
        { text: 'Start', onClick: () => handlePageChange('Start') },
        { text: 'Dokumente', onClick: () => handlePageChange('Document') },
        { text: 'Über uns', onClick: () => handlePageChange('About') },
        { text: 'Installation', onClick: () => handlePageChange('Installation') },
    ];

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#333' }}>
                <Toolbar>

                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <img className="navbar-logo" src={logo} alt="logo" style={{ height: '40px' }} />
                </Box>

                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: 'flex-end', margin: 1 }}>
                    <CloseIcon />
                </IconButton>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={item.onClick}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {renderPage()}
        </>
    );
};

export default Navbar;