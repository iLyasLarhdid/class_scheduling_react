import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
 
import PeriodApi from './periodApi';

const PeriodDisplay = () => {
    const {data,isLoading,error} = PeriodApi();
    console.log(data);
    return (
        <div>
          <h1>ALL Periods</h1>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow selected={true}>
                  <TableCell align="left"><b>Id</b></TableCell>
                  <TableCell align="left"><b>Period</b></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {error && <div>{error}</div>}
                {isLoading &&  <Box sx={{ width: '100%' }}> <LinearProgress /> </Box>}
                {data && data.error === undefined && data.map((datum) => (
                  <TableRow
                  key={datum.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell component="th" scope="row" align="left">
                      {datum.id}
                  </TableCell>
                  <TableCell align="left">{datum.period}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default PeriodDisplay;