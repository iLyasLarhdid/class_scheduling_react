import { Box, Button, CircularProgress, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import ProfApi from './profApi';

import properties from '../properties';
import { useSnackbar } from 'notistack';

 const ProfsDisplay = ({setUpdateProf, setShowAdd}) => {
    const {data,isLoading,error} = ProfApi();
    console.log(data);
    ///////////////////////////////////////////////////////
    
    const { enqueueSnackbar } = useSnackbar();
    const {host} = properties;

    const deleteProf = (id)=>{
        enqueueSnackbar('saving the product!', {
        variant: 'info',
        action:()=><CircularProgress color="success" />}
        );
        const professorId = id;
        const url = `${host}/api/v1/professors`;
        fetch(url,{
        method:'DELETE',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ professorId })
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
                    <Button variant="outlined" color="error" sx={{ ml:'1em' }} onDoubleClick={()=>deleteProf(prof.id)}>Delete</Button>
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