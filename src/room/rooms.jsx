import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import RoomApi from './roomsApi';
 
 const RoomsDisplay = () => {
    const {data,isLoading,error} = RoomApi();
    console.log(data);
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
            </TableRow>
            </TableHead>
            <TableBody>
            {data && data.map((room) => (
                <TableRow
                key={room.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="right">{room.title}</TableCell>
                <TableCell align="right">{room.capacity}</TableCell>
                <TableCell align="right">{room.roomType}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default RoomsDisplay;