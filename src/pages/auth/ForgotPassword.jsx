import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [email,setEmail]=useState('');
    const [newPassword,setnewPassword] = useState('');
    const [answer,setAnswer] = useState('');

    const navigate = useNavigate();

    const handleForgotPassword = async(e)=>{
        e.preventDefault();
        console.log(email,newPassword,answer);
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/forgot-password`,{
                email,
                newPassword,
                answer
            });
            if(!data?.success){
                toast.error(data?.message);
            }else {
                toast.success(data?.message);
                navigate('/login');
            }
        } catch (error){
            console.log(error);
            toast.error('Something went wrong.')
        }
    }

  return (
    <Layout>
        <div className="register lt-bg-gradient">
            <div className="register-body align-content-center">
                <h4 className='text-center'>FORGOT PASSWORD</h4>
                <form onSubmit={(e)=>handleForgotPassword(e)}>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder='Registered Email' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder='New Password'
                            value={newPassword}
                            onChange={(e)=>setnewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder='Answer of security question' 
                            value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default ForgotPassword