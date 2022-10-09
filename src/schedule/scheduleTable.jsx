import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ScheduleApi from './scheduleAPi';
import { Box, Button, LinearProgress } from '@mui/material';

export default function ScheduleTable({action,setAlreadyGenerated}) {

    const {data,isLoading,error} = ScheduleApi({action});
    console.log(data);
    // Function to download data to a file
    function download(filename, type) {
        if(data){
            const header = ['Group','module','Period','Professor','Room']
            let csvString = "\ufeff";
            header.map(val=>csvString+=val+',');
            csvString+='\r\n';
            data.map(row=>
                csvString+=row.group.groupTitle+','+row.module.moduleTitle+','+row.period.period+','+row.professor.name+','+row.room.title+'\r\n'
            )
            var file = new Blob([csvString], {type: type});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0); 
            }
        }
    }

    if(data && data.error === undefined && data.length!==0){
        setAlreadyGenerated(true);
        console.log("its true",data);
    }
    return (
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
            <Button color="success" disabled={data && data.error === undefined && data.length!==0 ? false:true} onClick={()=>download('myfilename.csv', 'text/plain')}>Download file</Button>
            </TableHead>
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
            {data && data.error === undefined && data.map((datum) => {
                return (
                <TableRow
                key={datum.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" align="left">
                    {datum.group.groupTitle} {datum.group.groupNumber}
                </TableCell>
                <TableCell align="left">{datum.module.moduleCode}</TableCell>
                <TableCell align="left">{datum.period.period}</TableCell>
                <TableCell align="left">{datum.professor.name}</TableCell>
                <TableCell align="left">{datum.room.title}</TableCell>
                </TableRow>
                )
            }
            )}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
