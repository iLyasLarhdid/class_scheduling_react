import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import RoomApi from './periodApi';
 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PeriodApi from './periodApi';

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
          <TableCell component="th" scope="row" align="left">{row.moduleCode}</TableCell>
          <TableCell align="left">{row.moduleTitle}</TableCell>
          <TableCell align="left">{row.roomType}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow selected={true}>
                      <TableCell align="left"><b>id</b></TableCell>
                      <TableCell align="left"><b>name</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.professors && row.professors.map((prof) => (
                      <TableRow key={prof.id}>
                        <TableCell component="th" scope="row" align="left">
                          {prof.id}
                        </TableCell>
                        <TableCell align="left">{prof.name}</TableCell>
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
                {data && data.map((datum) => (
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