import React, { useEffect } from 'react';
import { useFormik,Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { createPost, getPost, updatePost } from '../services/lib/postApi';
import { Button } from '@mui/material';
import Error from './Error';

export const EditForm = ({setPosts, posts, handleClose, id, editData}) => {
  const formik = useFormik({
    initialValues: {
        title: editData.title,
        body: editData.body,
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
        updatePost(editData.id,data).then(response => {
            setPosts(posts.map(post => {
                if(post.id == editData.id) {
                    console.log('inside if')
                    return {
                        ...post,
                        title:response.data.title,
                        body:response.data.body
                    }
                }
                return post
            }))
            handleClose()
        }).catch(err => {
            if(err.response.data.message === "Post with id 'undefined' not found"){
                setPosts(posts.map(post => {
                    if(post.id == editData.id) {
                        return {
                            ...post,
                            title:data.title,
                            body:data.body
                        }
                    }
                    handleClose()
                    return post
                }))
            }
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