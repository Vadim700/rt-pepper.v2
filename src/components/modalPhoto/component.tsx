import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from './style.module.scss';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useWindowWidth } from '../windowWidth/useWindowWidth';
import { BiFontSize } from 'react-icons/bi';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid var(--blue)',
  borderRadius: '12px',
  boxShadow: 24,
  p: window.innerWidth < 768 ? 2 : 4,
};

const styleModalImage = {
  width: '100%',
  maxWidth: 600,
  height: 'auto',
};

type ModalPhotoProps = {
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const ModalPhoto: React.FC<ModalPhotoProps> = ({ title, url }) => {
  const [open, setOpen] = React.useState(false);

  const windowWidth = useWindowWidth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.root}>
      <Button onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className={styles.title}>{title}</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img src={url} alt="" style={styleModalImage} />
          </Typography>
          <span className={styles.close} onClick={handleClose}>
            <RiCloseCircleLine />
          </span>
        </Box>
      </Modal>
    </div>
  );
};
