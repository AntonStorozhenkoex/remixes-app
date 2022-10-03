import React, { FC } from 'react';
import { Grid, Button } from '@mui/material';
import styles from './styles';

interface IAddPanel {
  setOpen: (prevState: boolean) => void | boolean;
}

const AddPanel: FC<IAddPanel> = ({ setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container sx={styles.container}>
      <Button sx={styles.addButton} onClick={() => handleOpen()}>
        Add New Remix
      </Button>
    </Grid>
  );
};

export default AddPanel;
