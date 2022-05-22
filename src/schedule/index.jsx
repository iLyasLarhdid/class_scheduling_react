import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ScheduleTable from './scheduleTable';
import { Button, CircularProgress } from '@mui/material';
import properties from "../properties";
import { useSnackbar } from 'notistack';

const {host} = properties;



const Schedule = ()=>{
  const { enqueueSnackbar } = useSnackbar();
  const getNew = async (key)=>{
    enqueueSnackbar('saving the product!', { variant: 'info', action:()=><CircularProgress color="success" />} );
    const url = `${host}/api/v1/schedules/generate`;
    const res = await fetch(url,{
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(data=>{
      console.log("upload=>");
      console.log(data);
      enqueueSnackbar('the classes have been generated!', {variant: 'success'});
    });
    console.log(res);
    return res.json();
  }
  return(
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography paragraph>
        <h1>Schedule</h1>
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={()=>getNew()}>Generate new</Button>
      <Typography paragraph>
        <ScheduleTable/>
      </Typography>
    </Box>
  )
}
export default Schedule;

