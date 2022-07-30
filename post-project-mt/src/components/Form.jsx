import React from 'react';
import { useFormik,Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { createPost } from '../services/lib/postApi';

export const Form = () => {
  const formik = useFormik({
    initialValues: {
        title: ''
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
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <TextField
         id='body'
         name='body'
         type='text'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.body}
         label='Body of Post'
      />
      {formik.touched.body && formik.errors.body ? (
        <div>{formik.errors.body}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};