import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Loading from '../../components/Loading';

const UpdateUser = ({uid,stateSetter}) => {
    const [loading,setloading] = useState(true);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone] = useState('');
    const [player,setPlayer] = useState('');
    const [updating,setupdating] = useState(false);

    const getUserData = async ()=>{
        setloading(true);
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/get-user/${uid}`);
            if(data?.success){
                setName(data.user.name);
                setEmail(data.user.email);
                setPhone(data.user.phone);
                setPlayer(data.user.role);
                setloading(false);
            }else{
                setloading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
            setloading(false);
        }
    }

    useEffect(()=>{
        getUserData();
    },[])

    const handleUpdate = async(e)=>{
        e.preventDefault();
        try{
            setupdating(true);
            const {data} = await axios.put(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/update-profile`,{
                name,
                email,
                phone,
                role:player
            });
            if(!data?.success){
                toast.error(data?.message);
                setupdating(false);
            }else {
                toast.success(data?.message);
                const token = JSON.parse(localStorage.getItem("tennis-auth"))?.token;
                const Updated = {
                    user:data.user,
                    token
                }
                localStorage.setItem('tennis-auth',JSON.stringify(Updated));
                setupdating(false);
                stateSetter(null);
            }
        } catch (error){
            console.log(error);
            toast.error('Something went wrong.')
        }
    }
  return (
    <div className='container-fluid mb-4' >
        <div className="row mt-2">
            <div className="col d-flex flex-row justify-content-start ms-2">
                <div onClick={()=>stateSetter(null)}><IoArrowBackCircleOutline size={50} /></div>
            </div>
        </div>
        <div className="row text-center mt-4">
            <div className="col fw-bold">
                <h4>UPDATE USER</h4>
            </div>
        </div>
        {!loading&&
            <div className="row text-center">
                <div className="col d-flex flex-wrap justify-content-center">
                    <div className="card lt-card-color" style={{ width: '18rem ' }}>
                        <div className="card-body align-content-center">
                            <form onSubmit={(e) => handleUpdate(e)}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputName1"
                                        aria-describedby="emailHelp"
                                        placeholder='Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                        disabled
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
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">USER ROLE</span>
                                    <select className="form-select form-select-sm"
                                            aria-label="Small select example Sizing example input" 
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={player}
                                            defaultValue={player}
                                            onChange={(e)=>setPlayer(e.target.value)}
                                    >
                                        <option value={0} >User</option>
                                        <option value={1} >Admin</option>
                                        <option value={2} >Player</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={updating?true:false}>SAVE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
        {
            loading&&
            <Loading/>
        }
    </div>
  )
}

export default UpdateUser