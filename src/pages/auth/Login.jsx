import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {useAuth} from '../../hooks/authContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
    const [auth,setAuth] = useAuth();
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleLoad = ()=>{
        if(auth?.token) navigate('/')
    }

    useEffect(()=>{
        handleLoad();
    },[]);

    const handleLogin = async(e)=>{
        e.preventDefault();
        if(!email || !password){
            toast.error('Email & Password are required');
            return;
        }
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/login`,{
                email, password
            });
            if(data?.success){
                localStorage.setItem('tennis-auth',JSON.stringify(data));
                setAuth({
                    ...auth,
                    user:data.user,
                    token:data.token
                })
                toast.success(data?.message);
                navigate(location.state ||'/');
            } else{
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
  return (
    <Layout>
        <div className="login lt-bg-gradient">
            <div className="login-body align-content-center">
                <h4 className='text-center'>LOGIN</h4>
                <form onSubmit={(e)=>handleLogin(e)}>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder='Enter your email' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                    </div>
                    <div className="mb-3 text-center">
                        <button className="btn btn-danger" onClick={()=>navigate('/forgot-password')}>FORGOT PASSWORD</button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Login