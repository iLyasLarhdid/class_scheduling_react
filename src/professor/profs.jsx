import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import ProfApi from './profApi';

 const ProfsDisplay = ({setUpdateProf, setShowAdd}) => {
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
            {error && <div>{error}</div>}
            {isLoading &&  <Box sx={{ width: '100%' }}> <LinearProgress /> </Box>}
            {data && data.error === undefined && data.map((prof) => (
                <TableRow
                key={prof.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="left">{prof.name}</TableCell>
                <TableCell align="left">
                    <Button variant="contained" color="success" onClick={()=>{setUpdateProf(prof);setShowAdd(old=>!old)}}>Update</Button>
                    <Button variant="outlined" color="error" sx={{ ml:'1em' }}>Delete</Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default ProfsDisplay;