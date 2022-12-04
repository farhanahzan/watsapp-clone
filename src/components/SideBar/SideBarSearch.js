import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SideBarSearch({ query, setQuery }) {
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
          placeholder="Search Room"
          type="search"
          disableUnderline={true}
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}

export default SideBarSearch;
