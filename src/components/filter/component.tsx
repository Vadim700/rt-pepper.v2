import React, { FC } from 'react';
import styles from './style.module.scss';
import { MdClear } from 'react-icons/md';

type FilterProps = {
  handlerChangeInput: any;
  handlerChangeSelect: any;
};

export const Filter: FC<FilterProps> = ({
  handlerChangeInput,
  handlerChangeSelect,
}) => {
  const [valueInput, setValueInput] = React.useState<string>('');
  const [valueSelect, setValueSelect] = React.useState<string>('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
    handlerChangeInput(e);
  };

  const onselectionchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect(e.target.value);
    handlerChangeSelect(e.target.value);
  };

  const onClear = () => {
    setValueInput('');
    handlerChangeInput({ target: { value: '' } });
  };

  return (
    <div className={styles.root}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search by..."
        value={valueInput}
        onChange={onChangeInput}
      />
      {valueInput && (
        <button className={styles.button} onClick={onClear}>
          <MdClear />
        </button>
      )}
      <select
        className={styles.select}
        onChange={onselectionchange}
        value={valueSelect}
      >
        <option className={styles.option} value="name">
          Name
        </option>
        <option className={styles.option} value="title">
          Title
        </option>
        <option className={styles.option} value="body">
          Body
        </option>
      </select>
    </div>
  );
};
