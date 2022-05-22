import React from 'react';
import { Formik } from 'formik';
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import properties from '../properties';
import { useSnackbar } from 'notistack';
import ModuleApi from '../module/modulesApi';


 const GroupForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {data,isLoading,error} = ModuleApi();
  console.log(data);
  const {host} = properties;
  ///////////////////////////////////////////////////////
  const save = (values,{ setSubmitting } )=>{
    console.log(values);
    const title = values.title;
    const numberOfStudents = values.numberOfStudents;
    const groupNumber = values.groupNumber;
    const modulesIds = values.modulesIds;
    const url = `${host}/api/v1/groups`;
    fetch(url,{
      method:"post",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, numberOfStudents, groupNumber, modulesIds })
    })
    .then(response =>{ 
      if(!response.ok){
          throw Error("somethign went wrong");
      }
      return response.json();
    }).then(data=>{
      console.log("upload=>");
      console.log(data);
      enqueueSnackbar('the Group has been saved!', {variant: 'success'});
      setSubmitting(false);
    }).catch(err=>{
      console.log("err ",err);
      enqueueSnackbar('Could not save the Group!', {variant: 'error'});
      setSubmitting(false);
    });
  }
  ////////////////////////////////////////////////////
  return (
    <div>
      <h1>Add Groups</h1>
      <Formik
        initialValues={{ title: '', numberOfStudents: '', groupNumber:'', modulesIds:[] }}
        onSubmit={(values, { setSubmitting }) => save(values, { setSubmitting }) }
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
             <TextField
                sx={{ mt:"1em" }}
                required
                id="1"
                label="Title"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                />
              
              <br/>
              <TextField
                sx={{ mt:"1em" }}
                required
                id="2"
                label="Number Of Students"
                type="number"
                name="numberOfStudents"
                onChange={handleChange}
                onBlur={handleBlur}
                 />
              <br/>
              <TextField
                sx={{ mt:"1em" }}
                required
                id="3"
                label="Group Number"
                type="number"
                name="groupNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                 />
              <br/>
            <FormControl fullWidth sx={{ mt:"1em" }}>
            <InputLabel id="modulesIds-simple-select-label">Modules</InputLabel>
              <Select
                  labelId="modulesIds-simple-select-label"
                  id="modulesIds-simple-select"
                  value={values.modulesIds}
                  label="Modules"
                  name="modulesIds"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  multiple
              >
                  {error && <div>{error}</div>}
                  {isLoading &&  <Box sx={{ width: '100%' }}> <LinearProgress /> </Box>}
                  {data && data.map(aModule=> 
                    <MenuItem key={aModule.id} value={aModule.id}>{aModule.moduleCode}</MenuItem> 
                    )}
              </Select>
            </FormControl>
            <br/>
            <Button type="submit" disabled={isSubmitting}  variant="contained" size="large" sx={{ mt:"1em" }}>
              Submit
            </Button>
            <Button type="reset" variant="contained" size="large" sx={{ ml:"1em", mt:"1em" }} onClick={()=>resetForm() }>
              Reset
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
 };
 
 export default GroupForm;