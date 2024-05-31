import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserSideMenu from '../../components/Helpers/UserSideMenu'
import { useAuth } from '../../hooks/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSideMenu from '../../components/Helpers/AdminSideMenu';

const CreateTournament = () => {
    const [creating,setcreating] = useState(false);
    const [name,setName] = useState("");
    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");
    const [venue,setVenue] = useState("");
    const [auth] = useAuth();

    const navigate = useNavigate();
    const delay = async (ms) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const handleCreate = async(e)=>{
        e.preventDefault();
        try{
            setcreating(true);
            const {data} = await axios.post(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/create-tournament`,{
                name,
                fromDate,
                toDate,
                venue
            })
            if(data?.success){
                toast.success(data.message);
                await delay(500);
                setcreating(false);
                navigate('/my-tournaments')
            }else {
                toast.error(data?.message);
                setcreating(false);
            }
        } catch(error){
            console.log(error);
            toast.error('Something went wrong')
            setcreating(false);
        }
    }
  return (
    <Layout title={`Create Tournament ${name?"-":""} ${name}`}>
        <div className="container-fluid lt-bg-gradient mt-2" style={{minHeight:"72vh"}}>
            <div className="row">
            <div className="col-md-3 mt-3">
                    {auth?.user?.role===1?<AdminSideMenu/>:<UserSideMenu/>}
                </div>
                <div className="col-md-9">
                    <div className='row text-center mb-2'>
                        <div className="col">
                            <h1>CREATE TOURNAMENT</h1>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col d-flex flex-wrap justify-content-center">
                            <div className="card lt-card-color" style={{width: '18rem '}}>
                                <div className="card-body align-content-center">
                                    <form onSubmit={(e)=>handleCreate(e)}>
                                        <div className="mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputName1" 
                                                aria-describedby="emailHelp" 
                                                placeholder='Tournament Name' 
                                                value={name}
                                                onChange={(e)=>setName(e.target.value)}
                                                style={{textTransform:"uppercase"}}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputName1" 
                                                aria-describedby="emailHelp" 
                                                placeholder='Tournament Venue' 
                                                value={venue}
                                                style={{textTransform:"uppercase"}}
                                                onChange={(e)=>setVenue(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-group input-group-sm mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-sm">From</span>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-sm" 
                                                value={fromDate}
                                                onChange={(e)=>{setFromDate(e.target.value);}}
                                                required
                                            />
                                        </div>
                                        <div className="input-group input-group-sm mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-sm">To</span>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-sm" 
                                                value={toDate}
                                                onChange={(e)=>{setToDate(e.target.value);}}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary" disabled={creating?true:false}>CREATE</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateTournament