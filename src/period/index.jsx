import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress } from '@mui/material';
import PeriodForm from './addPeriod';
import PeriodDisplay from './periods';
import { useSnackbar } from 'notistack';
import properties from '../properties';

const Period = ()=>{
    const [showAdd, setShowAdd] = useState(false);
    
    const { enqueueSnackbar } = useSnackbar();
    const [action, setAction] = useState(false);
    const {host} = properties;
    ///////////////////////////////////////////////////////
    const deleteAll = ()=>{
        enqueueSnackbar('Deleting all!', {
        variant: 'info',
        action:()=><CircularProgress color="success" />}
        );
        const url = `${host}/api/v1/periods`;
        fetch(url,{method:'DELETE'})
        .then(response =>{ 
            console.log(response);
            if(!response.ok){
                enqueueSnackbar('Could not delete!', {variant: 'error'});
            }
            else{
                enqueueSnackbar('Deleted!', {variant: 'success'});
                setAction(old=>!old);
            }
        });
    }
    ////////////////////////////////////////////////////
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            <h1>Periods</h1>
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={()=>setShowAdd(old=>!old)}>{showAdd?<>Show Period</>:<>Add Period</>}</Button>
        
        <Button variant="outlined" sx={{ ml: 2 ,mb: 2}} color="error" onDoubleClick={()=>deleteAll()}>Delete All</Button>
        <Typography paragraph>
            {showAdd?<PeriodForm/>:<PeriodDisplay action={action}/>}
        </Typography>
        </Box>
    )
}
export default Period;
