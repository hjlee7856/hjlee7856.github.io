import { Box, Modal } from '@mui/material';

interface Props {
  children: React.ReactElement;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CustomModal = (props: Props) => {
  const handleClose = () => props.setOpen(false);

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: 'translate(-50%, -50%)',
          outline: 'none',
        }}
      >
        {props.children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
