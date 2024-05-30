import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Tournaments = () => {
    const [loading,setloading] = useState(true);
    const [tournaments,setTournaments] = useState([]);
    const navigate = useNavigate();

    const getTournaments = async ()=>{
        try{
            setloading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/get-tournaments`);
            if(data?.success){
                setTournaments(data.tournaments);
                setloading(false);
            }else{
                toast.error(data?.message);
            }
        } catch(error){
            console.log(error);
            setloading(false);
        }
    }

    useEffect(()=>{
        getTournaments();
    },[])

  return (
    <Layout>
        <div className='container-fluid text-center lt-bg-gradient p-2'style={{minHeight:"72vh"}} >
            <div className="row">
                <div className="col mt-2">
                    <div className="row text-center">
                        <div className="col">
                            <h1>ALL TOURNAMENTS</h1>
                        </div>
                    </div>
                    {!loading&&<div className="row ">
                        <div className='col d-flex flex-wrap justify-content-center'>
                        {tournaments?.map(t=>(
                                <div className="card lt-card-color m-3" style={{width: '18rem '}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{t.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Venue : {t.venue}</h6>
                                        <p className="card-text">From : {t.fromDate}</p>
                                        <p className="card-text">To : {t.toDate}</p>
                                        <button onClick={()=>navigate(`/tournament-details/${t.slug}`)} className='btn btn-primary'>More Details</button>
                                    </div>
                                </div>
                        ))}
                        </div>
                    </div>}
                    {
                        loading&&<Loading/>
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Tournaments