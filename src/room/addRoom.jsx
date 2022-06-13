import React from 'react';
import { Formik } from 'formik';
import { Button, CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import properties from '../properties';
import { useSnackbar } from 'notistack';


 const RoomForm = ({update}) => {
  const { enqueueSnackbar } = useSnackbar();
  const {host} = properties;
  ///////////////////////////////////////////////////////
  const save = (values,{ setSubmitting } )=>{
    console.log("save");
    enqueueSnackbar('saving the product!', {
      variant: 'info',
      action:()=><CircularProgress color="success" />,
      key: 100}
    );
    const roomId = values.id;
    const title = values.title;
    const capacity = values.capacity;
    const roomType = values.roomType;
    const url = `${host}/api/v1/rooms`;
    const myMethod = update!==null?'put':'post';
    fetch(url,{
      method:myMethod,
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({roomId, title, capacity, roomType})
    })
    .then(response =>{ 
      if(!response.ok){
          throw Error("somethign went wrong");
      }
      return response.json();
    }).then(data=>{
      console.log("upload=>");
      console.log(data);
      enqueueSnackbar('the room has been saved!', {variant: 'success'});
      setSubmitting(false);
    }).catch(err=>{
      console.log("err ",err);
      enqueueSnackbar('Could not save the room!', {variant: 'error'});
      setSubmitting(false);
    });
  }
  ////////////////////////////////////////////////////
  
  const roomTypeStringToId = {'ECONOMICS' : 0, 'COMPUTERS' : 1,'ELECTRONICS' : 2,'CASUAL' : 3}
  return (
    <div style={{ backgroundColor:"white", padding:"1em", borderRadius:"10px" }}>
      <h1 style={{ borderBottom:"2px solid grey" }}>Add Rooms</h1>
      <Formik
        initialValues={{ 
          id: update!==null?update.id:"",
          title:  update!==null?update.title:"",
          capacity:  update!==null?update.capacity:"",
          roomType: update!==null?roomTypeStringToId[update.roomType]:3
        }}
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
          resetForm,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
              <TextField
                 required
                 id="1"
                 value={values.title}
                 label="Title"
                 type="text"
                 name="title"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 />
            {errors.email && touched.email && errors.email}
             <TextField
                 required
                 id="2"
                 value={values.capacity}
                 label="capacity"
                 type="number"
                 name="capacity"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 sx={{ml:"1em" }}
                 />
            {errors.capacity && touched.capacity && errors.capacity}
            <br/>
            <br/>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
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
           <br/>
            <Button type="submit" disabled={isSubmitting}  variant="contained" size="large" sx={{ mt:"1em" }}>
              Submit
            </Button>
            <Button type="reset" variant="contained" size="large" sx={{ ml:"1em",mt:"1em" }} onClick={()=>resetForm() }>
              Reset
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
 };
 
 export default RoomForm;