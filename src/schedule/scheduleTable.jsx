import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ScheduleApi from './scheduleAPi';
import { Box, LinearProgress, Tooltip } from '@mui/material';

export default function ScheduleTable({action}) {
        

    const {data,isLoading,error} = ScheduleApi({action});
    console.log(data);
    return (
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
            <TableRow selected={true}>
                <TableCell align="left"><b>Groups</b></TableCell>
                <TableCell align="left"><b>Module</b></TableCell>
                <TableCell align="left"><b>Period</b></TableCell>
                <TableCell align="left"><b>Professor</b></TableCell>
                <TableCell align="left"><b>Room</b></TableCell>
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
                    {datum.group.groupTitle} {datum.group.groupNumber}
                </TableCell>
                <TableCell align="left">
                    <Tooltip title={datum.module.moduleTitle} placement="top-start">
                        {datum.module.moduleCode}
                    </Tooltip>
                </TableCell>
                <TableCell align="left">{datum.period.period}</TableCell>
                <TableCell align="left">{datum.professor.name}</TableCell>
                <TableCell align="left">{datum.room.title}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
