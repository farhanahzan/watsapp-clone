import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';

import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import IconButton from '@mui/material/IconButton';
import AddRoom from './AddRoom/AddRoom';
import { LoginUserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import StyleAvatar from './StyleAvatar/StyleAvatar';

function SideBarTop() {
  const [show, setShow] = useState(false);
  const history = useNavigate();
  const { login, setLogin } = useContext(LoginUserContext);
  const handleOpenModal = () => {
    setShow(true);
  };
  return (
    <>
      {show && <AddRoom show={show} setShow={setShow} />}
      <Grid item xs={2}>
        <StyleAvatar alt={login.displayName} src={login.photoURL} />
      </Grid>
      <Grid
        item
        xs={10}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          columnGap: 0,
        }}
      >
        <IconButton color="inherit">
          <DonutLargeRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
        <IconButton onClick={handleOpenModal}>
          <AddRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            sessionStorage.setItem('user', '');
            setLogin('');
            history('/');
          }}
        >
          <ExitToAppRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
      </Grid>
    </>
  );
}

export default SideBarTop;
