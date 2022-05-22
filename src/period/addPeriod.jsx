import React, { Fragment, useState } from 'react';
import { Formik } from 'formik';
import { Button, CircularProgress, FormControl, TextField } from '@mui/material';
import properties from '../properties';
import { useSnackbar } from 'notistack';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

 const PeriodForm = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const { enqueueSnackbar } = useSnackbar();
  const {host} = properties;
  ///////////////////////////////////////////////////////
  const save = ()=>{
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const dayPeriods = ['9:00 - 10:30','10:45 - 12:15','13:15 - 14:45','15:00 - 16:30'];
    console.log('*--------*',state[0]);
    console.log('day',state[0].startDate.getDate()+1);
    console.log('day',weekday[state[0].startDate.getDay()]);
    console.log(state[0].startDate.getFullYear());
    console.log(month[state[0].startDate.getMonth()]);
    let period=[];
    let startDate = new Date(state[0].startDate);
    let endDate = new Date(state[0].endDate);

    var difference= Math.abs(endDate-startDate);
    let numberOfDays = difference/(1000 * 3600 * 24)+1;

    console.log(numberOfDays)
    for (let index = 0; index < numberOfDays; index++) {
      if( weekday[startDate.getDay()] !== "Sunday" && weekday[startDate.getDay()] !== "Saturday" ){
        dayPeriods.map(periodTime=>period=[...period,
          {"period":month[startDate.getMonth()]+' '+startDate.getDate()+' '+ weekday[startDate.getDay()]+' '+startDate.getFullYear()+' '+periodTime}
          ]
        );
      }
      startDate.setDate(startDate.getDate()+1);
    }
    console.log(period);
    enqueueSnackbar('saving the product!', {
      variant: 'info',
      action:()=><CircularProgress color="success" />}
      );
    const url = `${host}/api/v1/periods/all`;
    fetch(url,{
      method:"post",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(period)
    })
    .then(response =>{ 
      if(!response.ok){
          throw Error("somethign went wrong");
      }
      return response.json();
    }).then(data=>{
      console.log("upload=>");
      console.log(data);
      enqueueSnackbar('the module has been saved!', {variant: 'success'});
    }).catch(err=>{
      console.log("err ",err);
      enqueueSnackbar('Could not save the module!', {variant: 'error'});
    });
  }
  ////////////////////////////////////////////////////
  return (
    <div>
      <h1>Add Period</h1>
      <FormControl fullWidth sx={{ mt:"1em" }}>
        <DateRangePicker
          onChange={item => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
        />
      </FormControl>
    
      <br/>
      <Button type="submit" variant="contained" size="large" sx={{ mt:"1em" }} onClick={()=>save()}>
        Submit
      </Button>
    </div>
  )
 };
 
 export default PeriodForm;