import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ScheduleApi from './scheduleAPi';

export default function ScheduleTable({action}) {
        

    const {data,isLoading,error} = ScheduleApi({action});
    console.log(data);

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Groups</TableCell>
                <TableCell align="right">Module</TableCell>
                <TableCell align="right">Period</TableCell>
                <TableCell align="right">Professor</TableCell>
                <TableCell align="right">Room</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data && data.map((datum) => (
                <TableRow
                key={datum.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {datum.group.groupTitle}
                </TableCell>
                <TableCell align="right">{datum.module.moduleCode}</TableCell>
                <TableCell align="right">{datum.period.period}</TableCell>
                <TableCell align="right">{datum.professor.name}</TableCell>
                <TableCell align="right">{datum.room.title}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
