import React from 'react';
import { Formik } from 'formik';
import { Box, Button, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import properties from '../properties';
import { useSnackbar } from 'notistack';
import ProfApi from '../professor/profApi';


 const ModuleForm = ({updateMod, setUpdateMod}) => {
  console.log(updateMod);
  const { enqueueSnackbar } = useSnackbar();
  const {data,isLoading,error} = ProfApi();
  console.log(data);
  const {host} = properties;
  ///////////////////////////////////////////////////////
  const save = (values,{ setSubmitting } )=>{
    console.log(values);
    enqueueSnackbar('saving the product!', {
      variant: 'info',
      action:()=><CircularProgress color="success" />}
      );
    const moduleId = values.id;
    const moduleCode = values.code;
    const moduleTitle = values.title;
    const professorsIds = values.profsIds;
    const roomType = values.roomType;
    const myMethod = updateMod!==null?'put':'post';
    const url = `${host}/api/v1/modules`;
    fetch(url,{
      method:myMethod,
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ moduleId, moduleCode, moduleTitle, professorsIds, roomType})
    })
    .then(response =>{ 
      if(!response.ok){
          throw Error("somethign went wrong");
      }
      return response.json();
    }).then(data=>{
      console.log("upload=>");
      console.log(data);
      enqueueSnackbar('the module has been saved!', {variant: 'success'});
      setSubmitting(false);
    }).catch(err=>{
      console.log("err ",err);
      enqueueSnackbar('Could not save the module!', {variant: 'error'});
      setSubmitting(false);
    });
  }
  ////////////////////////////////////////////////////
  const roomTypeStringToId = {'ECONOMICS' : 0, 'COMPUTERS' : 1,'ELECTRONICS' : 2,'CASUAL' : 3}
  return (
    <div style={{ backgroundColor:"white", padding:"1em", borderRadius:"10px" }}>
      <h1 style={{ borderBottom:"2px solid grey" }}>Add Module</h1>
      <Formik
        initialValues={{ 
          id: updateMod!==null?updateMod.id:"",
          code: updateMod!==null?updateMod.moduleCode:"",
          title: updateMod!==null?updateMod.moduleTitle:"",
          profsIds: updateMod!==null?updateMod.professors.map(prof => prof.id):[],
          roomType:updateMod!==null?roomTypeStringToId[updateMod.roomType]:""
        }}
        onSubmit={(values, { setSubmitting }) => save(values, { setSubmitting }) }
      >
        {({
          values,
          errors,
          touched,
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
                value={values.code}
                label="Code"
                type="text"
                name="code"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth   
                />
              
              <br/>
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
                fullWidth
                 />
            <br/>
            <FormControl fullWidth sx={{ mt:"1em" }}>
            <InputLabel id="profsIds-simple-select-label">professors</InputLabel>
            <Select
                labelId="profsIds-simple-select-label"
                id="profsIds-simple-select"
                value={values.profsIds}
                label="professors"
                name="profsIds"
                onBlur={handleBlur}
                onChange={handleChange}
                multiple
             >
               
               {error && <div>{error}</div>}
                {isLoading &&  <Box sx={{ width: '100%' }}><LinearProgress/></Box>}
                {data && data.map(prof=> 
                  <MenuItem key={prof.id} value={prof.id}>{prof.name}</MenuItem> 
                  )}
           </Select>
          </FormControl>
            <br/>
          <FormControl fullWidth sx={{ mt:"1em" }}>
            <InputLabel id="roomType-simple-select-label">Room</InputLabel>
              <Select
                  labelId="roomType-simple-select-label"
                  id="roomType-simple-select"
                  value={values.roomType}
                  label="roomType"
                  name="roomType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                <MenuItem value={3} key={3}>CASUAL</MenuItem>
                <MenuItem value={0} key={0}>ECONOMICS</MenuItem>
                <MenuItem value={1} key={1}>COMPUTERS</MenuItem>
                <MenuItem value={2} key={2}>ELECTRONICS</MenuItem>
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
 
 export default ModuleForm;