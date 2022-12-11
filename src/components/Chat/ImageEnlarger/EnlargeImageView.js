import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function EnlargeImageView({
  previewImage,
  setPreviewImage,
  showEnlarge,
  setShowEnlarge,
}) {
  const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 2,
    p: 4,
  };
  const handleClose = () => {
    setShowEnlarge(false);
    setPreviewImage('');
  };
  return (
    <>
      <Modal
        open={showEnlarge}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            style={{ maxHeight: '90vh' }}
            src={previewImage}
            alt=" fullview"
          />
        </Box>
      </Modal>
    </>
  );
}
export default EnlargeImageView;
