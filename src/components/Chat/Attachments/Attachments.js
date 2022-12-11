import React, { useRef } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';

function Attachments({ handleFile }) {
  const uploadImageRef = useRef();
  const captureImageRef = useRef();

  const handleCaptureImage = () => {
    captureImageRef.current.click();
  };
  const handleFileUploadClick = () => {
    uploadImageRef.current.click();
  };
  return (
    <>
      <input
        style={{ display: 'none' }}
        ref={uploadImageRef}
        accept="image/*"
        onChange={handleFile}
        type="file"
      />
      <input
        style={{ display: 'none' }}
        ref={captureImageRef}
        accept="image/*"
        onChange={handleFile}
        type="file"
        capture="environment"
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: '-20px',
          '& .MuiFab-primary': {
            width: 30,
            height: 30,
            minHeight: 30,
            '& .MuiSpeedDialIcon-icon': { fontSize: 25 },
          },
        }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Camera"
          icon={<CameraAltRoundedIcon />}
          tooltipTitle="Camera"
          onClick={handleCaptureImage}
        />
        <SpeedDialAction
          key="Image"
          icon={<InsertPhotoRoundedIcon />}
          tooltipTitle="Image"
          onClick={handleFileUploadClick}
        />

        <SpeedDialAction
          key="PDF"
          icon={<PictureAsPdfRoundedIcon />}
          tooltipTitle="PDF"
        />
        <SpeedDialAction
          key="Docs"
          icon={<TextSnippetRoundedIcon />}
          tooltipTitle="Docs"
        />
      </SpeedDial>
    </>
  );
}

export default Attachments;
