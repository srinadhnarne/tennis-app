import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Profile = () => {
    const [loading,setloading] = useState(false);
    const user = JSON.parse(localStorage.getItem('tennis-auth'))?.user;
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const [phone,setPhone] = useState(user.phone);
    const [player,setPlayer] = useState(user.role);


    const handleUpdate = async(e)=>{
        e.preventDefault();
        try{
            setloading(true);
            const {data} = await axios.put(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/update-profile`,{
                name,
                email,
                phone,
                role:player
            });
            if(!data?.success){
                toast.error(data?.message);
                setloading(false);
            }else {
                toast.success(data?.message);
                const token = JSON.parse(localStorage.getItem("tennis-auth"))?.token;
                const Updated = {
                    user:data.user,
                    token
                }
                localStorage.setItem('tennis-auth',JSON.stringify(Updated));
                setloading(false);
            }
        } catch (error){
            console.log(error);
            toast.error('Something went wrong.')
            setloading(false);
        }
    }
  return (
    <div className='container-fluid'>
        <div className="row text-center mt-4">
            <div className="col fw-bold">
                <h4>PROFILE</h4>
            </div>
        </div>
        {
            user&&
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
                                <div className="mb-3" hidden={user?.role===1?true:false}>
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="flexCheckDefault"
                                        defaultChecked={player===2?true:false}
                                        onClick={(e)=>{e.target.checked?setPlayer(2):setPlayer(0);}}
                                        
                                    />
                                    <label className="form-check-label ms-2" htmlFor="flexCheckDefault">
                                        Select to register as a player
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading?true:false}>SAVE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Profile