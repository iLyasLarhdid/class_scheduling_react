import { useQuery } from "react-query";
import properties from "../properties";

const {host} = properties;
const fetchData = async (key)=>{
    let url = `${host}/api/v1/rooms`;
    const res = await fetch(url,{
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    console.log(res);
    return res.json();
}

const RoomApi = ()=>{
    const {data,isLoading,error} = useQuery(['schedule'],fetchData,{keepPreviousData:true});
    return {data,isLoading,error};
}

export default RoomApi;