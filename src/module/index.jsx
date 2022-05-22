import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ModuleForm from './addModule';
import ModuleDisplay from './modules';

const Module = ()=>{
    const [showAdd, setShowAdd] = useState(false);
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            <h1>Modules</h1>
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={()=>setShowAdd(old=>!old)}>{showAdd?<>Show Module</>:<>Add Module</>}</Button>
        <Typography paragraph>
            {showAdd?<ModuleForm/>:<ModuleDisplay/>}
        </Typography>
        </Box>
    )
}
export default Module;
