import { IconButton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import React, { useState, useMemo, useEffect } from 'react';
import SideBarSearch from '../../SideBar/SideBarSearch';
import { Stack } from '@mui/system';

import { MessageContext } from '../Chat';
import { useContext } from 'react';

export default function SearchMessage() {
  const [show, setShow] = useState(false);

  const { query, setQuery } = useContext(MessageContext);

  return (
    <>
      {show ? (
        <Stack sx={{ width: '200px', position: 'absolute', zIndex: 2 }}>
          <SideBarSearch
            query={query}
            setQuery={setQuery}
            setShow={setShow}
            chat={true}
          />
        </Stack>
      ) : null}
      <IconButton onClick={() => setShow(!show)}>
        <SearchRoundedIcon sx={{ color: 'secondary.light' }} />
      </IconButton>
    </>
  );
}
