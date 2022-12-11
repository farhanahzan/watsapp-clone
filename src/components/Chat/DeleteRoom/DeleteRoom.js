import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { IconButton } from '@mui/material';
import { auth, db } from '../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 20,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function DeleteRoom({ roomData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { roomId } = useParams();

  const curruser = auth.currentUser;

  const history = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (curruser !== null && curruser?.uid === roomData?.createdBy) {
      db.collection('rooms')
        .doc(roomId)
        .delete()

        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    }
    history('/');
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ cursor: 'pointer' }}
      >
        <MoreVertRoundedIcon sx={{ color: 'secondary.light' }} />
      </IconButton>
      {curruser !== null && curruser?.uid === roomData?.createdBy ? (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDelete} disableRipple>
            <DeleteForeverRoundedIcon />
            Delete Room
          </MenuItem>
        </StyledMenu>
      ) : null}
    </>
  );
}

export default DeleteRoom;
