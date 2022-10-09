import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ScheduleTable from './scheduleTable';
import { Button, CircularProgress, Popover } from '@mui/material';
import properties from "../properties";
import { useSnackbar } from 'notistack';

const {host} = properties;


const Schedule = ()=>{
  
  const { enqueueSnackbar } = useSnackbar();
  const [action, setAction] = useState(false);//<<<< this is nothing but a way to make my table rerender everytime i get data
  const [alreadyGenerated, setAlreadyGenerated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDelete, setAnchorElDelete] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = (event) => {
    setAnchorElDelete(event.currentTarget);
  };

  const handleCloseDelete = () => {
    setAnchorElDelete(null);
  };

  const open = Boolean(anchorEl);
  const openDelete = Boolean(anchorElDelete);
  const id = open ? 'simple-popover' : undefined;
  const idDelete = openDelete ? 'simple-popover-delete' : undefined;
  //////////////////////
  const getNew = async ()=>{
    enqueueSnackbar('saving the product!', { variant: 'info', action:()=><CircularProgress color="success" />} );
    const url = `${host}/api/v1/schedules/generate`;
    const res = await fetch(url,{
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(data=>{
      if(data.ok){
        enqueueSnackbar('the classes have been generated!', {variant: 'success'});
        setAction(old=>!old);
      }
      else
        enqueueSnackbar('Try again!', {variant: 'error'});
        
    });
    return res.json();
  }
  //////////////////////////
  ///////////////////////////////////////////////////////
  const deleteAll = ()=>{
    enqueueSnackbar('Deleting all!', {
      variant: 'info',
      action:()=><CircularProgress color="success" />}
      );
    const url = `${host}/api/v1/schedules`;
    fetch(url,{method:'DELETE'})
    .then(response =>{ 
      console.log(response);
      if(!response.ok){
        enqueueSnackbar('Could not delete!', {variant: 'error'});
      }
      else{
        enqueueSnackbar('Deleted!', {variant: 'success'});
        setAlreadyGenerated(false);
        setAction(old=>!old);
      }
    });
  }
  ////////////////////////////////////////////////////
  //////////////////////////
  return(
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography paragraph>
        <h1>Schedule</h1>
      </Typography>
      <Button aria-describedby={id} variant="contained" color='primary' sx={{ mb: 2,mr:2 }} onClick={alreadyGenerated ? handleClick : getNew}>
        Generate new
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure you want to generate a new one?
        <br/> make sure to save this one or you will lose it forever</Typography>
        <center>
          <Button variant="outlined" color='primary' size='small' sx={{ mb: 2,mr:2 }} onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color='warning' size='small' sx={{ mb: 2 }} onClick={()=>{getNew();handleClose()}}>Confirm</Button>
        </center>
      </Popover>
      
      <Button aria-describedby={idDelete} disabled={!alreadyGenerated} variant="outlined" color='error' sx={{ mb: 2,mr:2 }} onClick={handleClickDelete}>
        Delete All
      </Button>
      <Popover
        id={idDelete}
        open={openDelete}
        anchorEl={anchorElDelete}
        onClose={handleCloseDelete}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure you want to delete all?</Typography>
        <center>
          <Button variant="outlined" color='primary' size='small' sx={{ mb: 2,mr:2 }} onClick={handleCloseDelete}>Cancel</Button>
          <Button variant="contained" color="error" size='small' sx={{ mb: 2 }} onClick={()=>{deleteAll();handleCloseDelete()}}>Confirm</Button>
        </center>
      </Popover>
      <Typography paragraph>
        <ScheduleTable action={action} setAlreadyGenerated={setAlreadyGenerated}/>
      </Typography>
    </Box>
  )
}
export default Schedule;

