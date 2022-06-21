import React from 'react';
import { Formik } from 'formik';
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import properties from '../properties';
import { useSnackbar } from 'notistack';
import ModuleApi from '../module/modulesApi';


 const GroupForm = ({update, setUpdate}) => {
  const { enqueueSnackbar } = useSnackbar();
  const {data,isLoading,error} = ModuleApi();
  console.log(data);
  const {host} = properties;
  ///////////////////////////////////////////////////////
  const save = (values,{ setSubmitting } )=>{
    console.log(values);
    const id = values.id;
    const title = values.title;
    const numberOfStudents = values.numberOfStudents;
    const modulesIds = values.modulesIds;
    const url = `${host}/api/v1/groups`;
    
    const myMethod = update!==null?'put':'post';
    fetch(url,{
      method:myMethod,
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, numberOfStudents, modulesIds })
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
    <div style={{ backgroundColor:"white", padding:"1em", borderRadius:"10px" }}>
      <h1 style={{ borderBottom:"2px solid grey" }}>Add Groups</h1>
      <Formik
        initialValues={{ 
          id: update!==null?update.id:"",
          title: update!==null?update.groupTitle:"",
          numberOfStudents: update!==null?update.nstudents:"",
          modulesIds:update!==null?update.modules.map(mod => mod.id):[]
        }}
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
                value={values.title}
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
                value={values.numberOfStudents}
                label="Number Of Students"
                type="number"
                name="numberOfStudents"
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
                    <MenuItem key={aModule.id} value={aModule.id}>{aModule.moduleTitle}</MenuItem> 
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