import React, { FC, ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ICustomAlert {
  errorMessage: ReactNode | undefined;
  open: boolean;
  handleClose: () => void;
}

const CustomAlert: FC<ICustomAlert> = ({ open, errorMessage, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={errorMessage ? 'error' : 'success'} sx={{ width: '100%' }}>
        {errorMessage || 'Success '}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
