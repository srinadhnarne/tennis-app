import {useState,useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner';
import { useAuth } from '../../hooks/authContext';
import Loading from '../Loading';

export default function AdminRoute(){
    const [ok,setOK] = useState(false);
    const [auth] = useAuth();
    const [checking,setchecking] = useState(true);

    useEffect(()=>{
        const authCheck = async()=>{
            try {
                setchecking(true);
                const res = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/admin-auth`);
                if(res?.data.ok){
                    setOK(true);
                    setchecking(false);
                } else {
                    setOK(false);
                    setchecking(false);
                }
            } catch (error) {
                console.log(error);
                setchecking(false);
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token]);

    return ok? <Outlet/> : (checking?<Loading/>:<Spinner/>)
}