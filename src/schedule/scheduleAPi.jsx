import { useQuery } from "react-query";
import properties from "../properties";

const {host} = properties;
const fetchData = async (key)=>{
    const action = key.queryKey[1];
    let url = `${host}/api/v1/schedules`;
    if(action==="generate"){
        url = `${host}/api/v1/schedules/generate`;
    }
    const res = await fetch(url,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    console.log(res);
    return res.json();
}

const ScheduleApi = ({action})=>{
    const {data,isLoading,error} = useQuery(['schedule',action],fetchData,{keepPreviousData:true});
    return {data,isLoading,error};
}

export default ScheduleApi;