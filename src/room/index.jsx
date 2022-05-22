import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import RoomForm from './addRoom';
import RoomsDisplay from './rooms';

const Room = ()=>{
    const [showAdd, setShowAdd] = useState(false);
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            <h1>Rooms</h1>
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={()=>setShowAdd(old=>!old)}>{showAdd?<>Show room</>:<>Add room</>}</Button>
        <Typography paragraph>
            {showAdd?<RoomForm/>:<RoomsDisplay/>}
        </Typography>
        </Box>
    )
}
export default Room;
