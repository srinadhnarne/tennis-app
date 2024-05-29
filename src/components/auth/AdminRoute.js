import {useState,useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner';
import { useAuth } from '../../hooks/authContext';

export default function AdminRoute(){
    const [ok,setOK] = useState(false);
    const [auth] = useAuth();

    useEffect(()=>{
        const authCheck = async()=>{
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/admin-auth`);
                if(res?.data.ok){
                    setOK(true);
                } else {
                    setOK(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token]);

    return ok? <Outlet/> : <Spinner/>
}