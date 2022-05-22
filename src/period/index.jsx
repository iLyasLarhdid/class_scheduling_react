import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import PeriodForm from './addPeriod';
import PeriodDisplay from './periods';

const Period = ()=>{
    const [showAdd, setShowAdd] = useState(false);
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            <h1>Periods</h1>
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={()=>setShowAdd(old=>!old)}>{showAdd?<>Show Period</>:<>Add Period</>}</Button>
        <Typography paragraph>
            {showAdd?<PeriodForm/>:<PeriodDisplay/>}
        </Typography>
        </Box>
    )
}
export default Period;
