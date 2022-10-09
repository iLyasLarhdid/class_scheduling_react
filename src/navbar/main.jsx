import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Main = ()=>{
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div style={{ width:'100%',backgroundColor:'white', padding:'1em 1em 1em 1em', borderRadius:'10px' }}><h1 style={{ borderBottom:'2px solid lightblue' }}>University Exam Scheduling using AI.</h1>
        <img src='images/ai.png' alt='temporaryImage' width={'100%'}/>
        <Typography paragraph>
        Scheduling problems is a difficult task in the artificial intelligence. It deals with the allocation of limited resources to tasks over time. The process is to optimize one or more objectives. Currently, examination timetable scheduling at ISGA (higher institute of engineering and business) is done manually, where the time task has been created one month earlier before the exam. Hence. The project have targeted on school examination timetabling problem. Hence, Genetic Algorithm (GA) is used as one of the most popular optimization solutions within one of the 5 steps in the design research methodology, at the suggestion phase which includes the development of the model (GA) that setup the suitable penalties of hard and soft constraints based on the fitness function. It has been implemented in various applications, which is suitable for discrete problems and gives a population of good solutions the algorithm's flexibility as one of the best robust schemes.
        </Typography>
        </div>
      </Box>
    )
}
export default Main;