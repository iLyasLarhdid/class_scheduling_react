import { Box, Button, CircularProgress, Collapse, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import RoomApi from './groupApi';
 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSnackbar } from 'notistack';
import properties from '../properties';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const {setUpdate, setShowAdd} = props
    
    const { enqueueSnackbar } = useSnackbar();
    const {host} = properties;
    ///////////////////////////////////////////////////////
    const deleteMe = (id)=>{
      enqueueSnackbar('saving the product!', {
        variant: 'info',
        action:()=><CircularProgress color="success" />}
        );
      const url = `${host}/api/v1/groups`;
      fetch(url,{
        method:'DELETE',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
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
          <TableCell align="left">
            <Button variant="contained" color="success" onClick={()=>{setUpdate(row);setShowAdd(old=>!old)}}>Update</Button>
            <Button variant="outlined" color="error" sx={{ ml:'1em' }} onDoubleClick={()=>deleteMe(row.id)}>Delete</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow selected={true}>
                      <TableCell align="left"><b>ModuleCode</b></TableCell>
                      <TableCell align="left"><b>ModuleTitle</b></TableCell>
                      <TableCell align="left"><b>Number of professors</b></TableCell>
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


 const GroupDisplay = ({setUpdate, setShowAdd}) => {
    const {data,isLoading,error} = RoomApi();
    console.log(data);
    return (
        <div>
          <h1>ALL Groups</h1>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow selected={true}>
                  <TableCell align="left"><b>Modules</b></TableCell>
                  <TableCell align="left"><b>Title</b></TableCell>
                  <TableCell align="left"><b>Number of students</b></TableCell>
                  <TableCell align="left"><b>Action</b></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  {error && <div>{error}</div>}
                  {isLoading &&  <Box sx={{ width: '100%' }}> <LinearProgress /> </Box>}
                  {data && data.error === undefined && data.map((row) => (
                    <Row key={row.id} row={row} setUpdate={setUpdate} setShowAdd={setShowAdd}/>
                  ))}
              </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default GroupDisplay;
