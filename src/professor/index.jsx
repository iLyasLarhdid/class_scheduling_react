import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ProfForm from './addProf';
import ProfsDisplay from './profs';

const Professor = ()=>{
    const [showAdd, setShowAdd] = useState(false);
    const [updateProf, setUpdateProf] = useState(null);
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            <h1>Professors</h1>
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={()=>{setShowAdd(old=>!old);setUpdateProf(null)}}>{showAdd?<>Show professors</>:<>Add Professor</>}</Button>
        <Typography paragraph>
            {showAdd || updateProf!==null?
                <ProfForm updateProf={updateProf} setUpdateProf={setUpdateProf}/>
                    :
                <ProfsDisplay setUpdateProf={setUpdateProf} setShowAdd={setShowAdd}/>}
        </Typography>
        </Box>
    )
}
export default Professor;
