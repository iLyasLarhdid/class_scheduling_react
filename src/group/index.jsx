import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import GroupForm from './addGroup';
import GroupDisplay from './groups';

const Group = ()=>{
    const [showAdd, setShowAdd] = useState(false);
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            <h1>Groups</h1>
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={()=>setShowAdd(old=>!old)}>{showAdd?<>Show Groups</>:<>Add Groups</>}</Button>
        <Typography paragraph>
            {showAdd?<GroupForm/>:<GroupDisplay/>}
        </Typography>
        </Box>
    )
}
export default Group;
