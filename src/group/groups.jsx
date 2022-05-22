import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import RoomApi from './groupApi';
 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell align="left">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="left">{row.groupTitle}</TableCell>
          <TableCell align="left">{row.nstudents}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow selected={true}>
                      <TableCell align="left"><b>moduleCode</b></TableCell>
                      <TableCell align="left"><b>moduleTitle</b></TableCell>
                      <TableCell align="left"><b>number of professors</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.modules && row.modules.map((aModule) => (
                      <TableRow key={aModule.id}>
                        <TableCell component="th" scope="row" align="left">
                          {aModule.moduleCode}
                        </TableCell>
                        <TableCell align="left">{aModule.moduleTitle}</TableCell>
                        <TableCell align="left">{aModule.professors.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


 const GroupDisplay = () => {
    const {data,isLoading,error} = RoomApi();
    console.log(data);
    return (
        <div>
          <h1>ALL Module</h1>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow selected={true}>
                  <TableCell align="left"><b>Modules</b></TableCell>
                  <TableCell align="left"><b>Title</b></TableCell>
                  <TableCell align="left"><b>Number of students</b></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  {data && data.map((row) => (
                    <Row key={row.id} row={row} />
                  ))}
              </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default GroupDisplay;
