import { useQuery } from "react-query";
import properties from "../properties";

const {host} = properties;
const fetchData = async (key)=>{
    let url = `${host}/api/v1/periods`;
    const action = key.queryKey[1];
    console.log(action);
    const res = await fetch(url,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    return res.json();
}

const PeriodApi = ({action})=>{
    const {data,isLoading,error} = useQuery(['modules',action],fetchData,{keepPreviousData:true});
    console.log(data);
    return {data,isLoading,error};
}

export default PeriodApi;