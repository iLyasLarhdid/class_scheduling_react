import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ScheduleTable from './scheduleTable';
import { Button } from '@mui/material';

const Schedule = ()=>{
  let scheduleTable = <ScheduleTable/>;
  return(
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography paragraph>
        <h1>Schedule</h1>
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={()=>scheduleTable=<ScheduleTable action="/generate"/>}>Generate new</Button>
      <Typography paragraph>
        {scheduleTable}
      </Typography>
    </Box>
  )
}
export default Schedule;

