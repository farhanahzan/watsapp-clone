import React from 'react'
import Grid from '@mui/material/Grid';

import Avatar from '@mui/material/Avatar';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import IconButton from '@mui/material/IconButton';

function SideBarTop() {
  return (
    <>
    <Grid item xs={2} >
        <Avatar
          sx={{
            border: 1,
            borderColor: 'neutral2.main',
            boxShadow: 8,
            width: 46,
            height: 46,
          }}
          alt="profile pic"
          src="https://media-exp1.licdn.com/dms/image/C5603AQHoZqnBhqkK1A/profile-displayphoto-shrink_200_200/0/1659284539447?e=1674086400&v=beta&t=xaZzwsidiyMhRPz-DY-uX78nDEctHChzNXq9nwc2bF4"
        />
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
        <IconButton>
          <AddRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
        <IconButton>
          <ExitToAppRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
      </Grid>
    </>
  )
}

export default SideBarTop