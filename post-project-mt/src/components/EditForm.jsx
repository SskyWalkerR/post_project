import React from 'react';
import { useFormik,Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { createPost } from '../services/lib/postApi';
import { Button } from '@mui/material';
import Error from './Error';

export const EditForm = ({setPosts, posts, handleClose}) => {
  const formik = useFormik({
    initialValues: {
        title: '',
        body: '',
    },
    validationSchema: Yup.object({
        title: Yup.string()
        .required('Required'),
        body: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
        const data = {
            ...values
        }
        data.userId = 5
        createPost(data).then(data => {
            console.log(data.data)
            setPosts([...posts, data.data])
            handleClose()
        }).catch(err => {
            console.log(err)
        })
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
         id='title'
         name='title'
         type='text'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.title}
         label='New Post'
         fullWidth
         margin="normal"
      />
      <Error touched={formik.touched.title} errors={formik.errors.title} />

      <TextField
         id='body'
         name='body'
         type='text'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.body}
         label='Body of Post'
         fullWidth
         multiline
         rows={4}
         margin="normal"
      />
      <Error touched={formik.touched.title} errors={formik.errors.title} />
      
           <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
    </form>
  );
};