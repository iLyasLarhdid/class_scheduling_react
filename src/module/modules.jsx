import { Box, Button, CircularProgress, Collapse, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import RoomApi from './modulesApi';
 
import properties from '../properties';
import { useSnackbar } from 'notistack';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row } = props;
    const {setUpdateMod, setShowAdd} = props
    const [open, setOpen] = React.useState(false);
    
    const { enqueueSnackbar } = useSnackbar();
    const {host} = properties;
  ///////////////////////////////////////////////////////
  const deleteModule = (id)=>{
    enqueueSnackbar('saving the product!', {
      variant: 'info',
      action:()=><CircularProgress color="success" />}
      );
    const moduleId = id;
    const url = `${host}/api/v1/modules`;
    fetch(url,{
      method:'DELETE',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ moduleId })
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
          <TableCell component="th" scope="row" align="left">{row.moduleCode}</TableCell>
          <TableCell align="left">{row.moduleTitle}</TableCell>
          <TableCell align="left">{row.roomType}</TableCell>
          <TableCell align="left">
            <Button variant="contained" color="success" onClick={()=>{setUpdateMod(row);setShowAdd(old=>!old)}}>Update</Button>
            <Button variant="outlined" color="error" sx={{ ml:'1em' }} onDoubleClick={()=>deleteModule(row.id)}>Delete</Button></TableCell>
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


 const ModuleDisplay = ({setUpdateMod, setShowAdd}) => {
    const {data,isLoading,error} = RoomApi();
    console.log(data);
    return (
        <div>
          <h1>ALL Module</h1>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow selected={true}>
                  <TableCell align="left"><b>Professors</b></TableCell>
                  <TableCell align="left"><b>Code</b></TableCell>
                  <TableCell align="left"><b>Title</b></TableCell>
                  <TableCell align="left"><b>Room type</b></TableCell>
                  <TableCell align="left"><b>Action</b></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {error && <div>{error}</div>}
                {isLoading &&  <Box sx={{ width: '100%' }}><LinearProgress/></Box>}
                {data && data.error === undefined && data.map((row) => (
                  <Row key={row.id} row={row} setUpdateMod={setUpdateMod} setShowAdd={setShowAdd}/>
                ))}
              </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
 }
 
 export default ModuleDisplay;

 /**
  * <TableBody>
            {data && data.map((room) => (
                <TableRow
                key={room.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="right">{room.moduleCode}</TableCell>
                    <TableCell align="right">{room.moduleTitle}</TableCell>
                    <TableCell align="right">{room.capacity}</TableCell>
                    <TableCell align="right">{room.roomType}</TableCell>
                </TableRow>
            ))}
            </TableBody>
  */