import { useQuery } from "react-query";
import properties from "../properties";

const {host} = properties;
const fetchData = async (key)=>{
    let url = `${host}/api/v1/professors`;
    const res = await fetch(url,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    console.log(res);
    return res.json();
}

const ProfApi = ()=>{
    const {data,isLoading,error} = useQuery(['schedule'],fetchData,{keepPreviousData:true});
    console.log(data);
    return {data,isLoading,error};
}

export default ProfApi;