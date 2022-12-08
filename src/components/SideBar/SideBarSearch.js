import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SideBarSearch({ query, setQuery, chat, setShow }) {
  const handleClose = () => {
    setShow(false);
    setQuery('');
  };
  return (
    <>
      <FormControl
        variant="standard"
        sx={{
          bgcolor: 'white',
          px: 1.5,
          py: 0.5,
          borderRadius: 10,
          boxShadow: 4,
          width: '90%',
        }}
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ fontSize: 12, width: '100%' }}
          placeholder={chat ? 'Search Message' : 'Search Room'}
          type="search"
          disableUnderline={true}
          startAdornment={
            !chat ? (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ) : null
          }
          endAdornment={
            chat ? (
              <InputAdornment
                sx={{ cursor: 'pointer' }}
                position="end"
                onClick={handleClose}
              >
                <SearchOffRoundedIcon />
              </InputAdornment>
            ) : null
          }
        />
      </FormControl>
    </>
  );
}

export default SideBarSearch;
