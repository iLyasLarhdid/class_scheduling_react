import { Box, Button, CircularProgress, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import properties from '../properties';
import RoomApi from './roomsApi';
 
 const RoomsDisplay = ({setUpdate, setShowAdd}) => {
    const {data,isLoading,error} = RoomApi();
    console.log(data);
    const { enqueueSnackbar } = useSnackbar();
    const {host} = properties;
    ///////////////////////////////////////////////////////
    const deleteMe = (id)=>{
      enqueueSnackbar('saving the product!', {
        variant: 'info',
        action:()=><CircularProgress color="success" />}
        );
      const roomId = id;
      const url = `${host}/api/v1/rooms`;
      fetch(url,{
        method:'DELETE',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId })
      })
      .then(response =>{ 
        console.log(response);
        if(!response.ok){
          enqueueSnackbar('Could not delete!', {variant: 'error'});
        }
        else{
          enqueueSnackbar('Deleted!', {variant: 'success'});
        }
      });
    }
    ////////////////////////////////////////////////////
    return (
        <div>
          <h1>ALL Rooms</h1>
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow selected={true}>
                <TableCell align="right"><b>title</b></TableCell>
                <TableCell align="right"><b>capacity</b></TableCell>
                <TableCell align="right"><b>room type</b></TableCell>
                <TableCell align="left"><b>Action</b></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {error && <div>{error}</div>}
                {isLoading &&  <Box sx={{ width: '100%' }}> <LinearProgress /> </Box>}
                {data && data.error === undefined && data.map((room) => (
                    <TableRow
                    key={room.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="right">{room.title}</TableCell>
                    <TableCell align="right">{room.capacity}</TableCell>
                    <TableCell align="right">{room.roomType}</TableCell>
                    <TableCell align="left">
                        <Button variant="contained" color="success" onClick={()=>{setUpdate(room);setShowAdd(old=>!old)}}>Update</Button>
                        <Button variant="outlined" color="error" sx={{ ml:'1em' }} onDoubleClick={()=>deleteMe(room.id)}>Delete</Button>
                    </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default RoomsDisplay;