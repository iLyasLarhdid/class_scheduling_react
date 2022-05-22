import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import ProfApi from './profApi';

 const ProfsDisplay = () => {
    const {data,isLoading,error} = ProfApi();
    console.log(data);
    return (
        <div>
          <h1>ALL Professors</h1>
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow selected={true}>
                <TableCell align="left"><b>name</b></TableCell>
                <TableCell align="left"><b>action</b></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data && data.map((prof) => (
                <TableRow
                key={prof.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="left">{prof.name}</TableCell>
                <TableCell align="left">action</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default ProfsDisplay;