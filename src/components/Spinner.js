import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

const Spinner = ({path='/'}) => {
    const [count,setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue)
        },1000);
        if(count===0){
            if (!auth?.token) {
                navigate(`/login`,{
                state: location.pathname});
            } else {
                navigate(`${path}`,{
                    state: location.pathname
                })
            }
        }
        return ()=> clearInterval(interval)
    },[count,navigate,location,path,auth?.token]);

  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:'100vh'}}>
            <h1 className='text-center'>Redirecting in {count} seconds</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </>
  )
}

export default Spinner