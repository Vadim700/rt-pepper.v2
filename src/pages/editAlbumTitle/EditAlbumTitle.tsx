import styles from './style.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editAlbum } from '../../redux/thunks/albumsThunks';

export const EditAlbumTitle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const defaultTitle = useAppSelector((item) => item.album.list).find(
    (item) => item.id === Number(id),
  );

  const onsubmit = (e: any) => {
    e.preventDefault();

    const title = e.target[0].value;
    dispatch(editAlbum({ id, title }));
    navigate(-1);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Edit Todo № {id}</h1>

      <form action="#" onSubmit={onsubmit}>
        <label htmlFor="" className={styles.label}>
          <input
            type="text"
            defaultValue={defaultTitle?.title}
            className={styles.input}
          />
        </label>
      </form>
    </div>
  );
};
