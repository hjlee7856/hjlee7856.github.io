import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
