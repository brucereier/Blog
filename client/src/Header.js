import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bruce Reier - Software Engineer
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab
            label="Software"
            value="/"
            sx={{
              color: value === '/' ? 'white' : 'inherit',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          />
          <Tab
            label="Writing"
            value="/writing"
            sx={{
              color: value === '/writing' ? 'white' : 'inherit',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          />
          <Tab
            label="Bookshelf"
            value="/bookshelf"
            sx={{
              color: value === '/bookshelf' ? 'white' : 'inherit',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
