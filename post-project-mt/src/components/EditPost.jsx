import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Form } from './Form';
import { EditForm } from './EditForm';
import { getPost } from '../services/lib/postApi';

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

export const EditPost = ({open, handleClose, setPosts, posts, editData}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <EditForm setPosts={setPosts} posts={posts} handleClose={handleClose} editData={editData}/>
          {/* <Form setPosts={setPosts} posts={posts} handleClose={handleClose}/> */}
        </Box>
      </Modal>
    </div>
  );
}
