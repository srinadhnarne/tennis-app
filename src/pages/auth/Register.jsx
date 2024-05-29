import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [answer,setAnswer] = useState('');
    const [player,setPlayer] = useState(0);

    const navigate = useNavigate();

    const handleRegister = async(e)=>{
        e.preventDefault();
        console.log(name,email,password,phone,player);
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/register`,{
                name,
                email,
                password,
                phone,
                player,
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
                <h4 className='text-center'>REGISTRATION</h4>
                <form onSubmit={(e)=>handleRegister(e)}>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputName1" 
                            aria-describedby="emailHelp" 
                            placeholder='Name' 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder='Email' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder='Password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputPhone1" 
                            placeholder='Mobile Number'
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            required
                        />
                    </div>
                    {/* <div className="mb-3">
                        <label for="exampleInputSecurity1" class="form-label">Security Question</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputSecurity1" 
                            placeholder="Favourite tennis player name"
                            value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                            required
                        />
                    </div> */}
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Security Question</span>
                        <input 
                            type="text" 
                            id="exampleInputSecurity1" 
                            placeholder="Favourite tennis player name"
                            className="form-control" 
                            aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-sm" 
                            value={answer}
                            onChange={(e)=>{setAnswer(e.target.value);}}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="flexCheckDefault"
                            onClick={(e)=>{e.target.checked?setPlayer(2):setPlayer(0);console.log(e.target.checked,player)}}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Select to register as a player
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Register