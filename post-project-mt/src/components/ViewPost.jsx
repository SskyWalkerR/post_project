import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Form } from './Form';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const  ViewPost = ({open, handleClose, setPosts, posts, editData}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
         id='title'
         name='title'
         type='text'
         value={editData.title}
         label='Post'
         fullWidth
         margin="normal"
         disabled
      /> 
        <TextField
         id='body'
         name='body'
         type='text'
         value={editData.body}
         label='Body of Post'
         fullWidth
         multiline
         rows={4}
         margin="normal"
         disabled
      />
        </Box>
      </Modal>
    </div>
  );
}
