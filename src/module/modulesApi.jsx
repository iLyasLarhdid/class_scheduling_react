import { useQuery } from "react-query";
import properties from "../properties";

const {host} = properties;
const fetchData = async (key)=>{
    let url = `${host}/api/v1/modules`;
    const res = await fetch(url,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    return res.json();
}

const ModuleApi = ()=>{
    const {data,isLoading,error} = useQuery(['modules'],fetchData,{keepPreviousData:true});
    console.log(data);
    return {data,isLoading,error};
}

export default ModuleApi;