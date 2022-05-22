import React from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import properties from '../properties';
import { useSnackbar } from 'notistack';


 const ProfForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {host} = properties;
  ///////////////////////////////////////////////////////
  const save = (values,{ setSubmitting } )=>{
    console.log("save");
    const name = values.name;
    const url = `${host}/api/v1/professors`;
    fetch(url,{
        method:"post",
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    .then(response =>{ 
        if(!response.ok){
            throw Error("somethign went wrong");
        }
        return response.json();
    }).then(data=>{
        console.log("upload=>");
        console.log(data);
        enqueueSnackbar('The professor has been saved!', {variant: 'success'});
        setSubmitting(false);
    }).catch(err=>{
        console.log("err ",err);
        enqueueSnackbar('Could not save the professor!', {variant: 'error'});
        setSubmitting(false);
    });
  }
  ////////////////////////////////////////////////////
  return (
    <div>
      <h1>Add Professor</h1>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, { setSubmitting },onSubmitProps) => {save(values, { setSubmitting }); onSubmitProps.resetForm() }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
              <TextField
                 required
                 id="1"
                 label="name"
                 type="text"
                 name="name"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 />
            {errors.name && touched.name && errors.name}
            <Button type="submit" disabled={isSubmitting}  variant="contained" size="large" sx={{ p: "1em",ml:"1em" }}>
              Submit
            </Button>
            <Button type="reset" variant="contained" size="large" sx={{ p: "1em",ml:"1em" }}>
              Reset
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
 };
 
 export default ProfForm;