import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPhotos } from '../../redux/thunks/albumsThunks';

import styles from './style.module.scss';
import { Photo } from '../../types';
import { MyLoader } from '../../components/sceleton/Skeleton';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export const AlbumPhotos: FC = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((item) => item.album.photosList);
  const { loadingPhotos } = useAppSelector((item) => item.album);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const currintAlbum = useAppSelector((item) => item.album.list).find(
    (item) => item.id === Number(id),
  );

  React.useEffect(() => {
    dispatch(fetchPhotos(String(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.root}>
      <h2 className={styles.titleOfPage}> {currintAlbum?.title}</h2>
      <div className={styles.grid}>
        {data.map((item: Photo) => (
          <React.Fragment key={item.id}>
            {loadingPhotos === true ? (
              <MyLoader />
            ) : (
              <div className={styles.photo}>
                <Button onClick={handleOpen}>
                  <div className={styles.image}>
                    <img src={item.thumbnailUrl} alt="" />
                  </div>
                </Button>
                <div className={styles.title}>{item.title}</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
