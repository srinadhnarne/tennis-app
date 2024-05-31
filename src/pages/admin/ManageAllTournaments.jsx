import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSideMenu from '../../components/Helpers/AdminSideMenu';
import Loading from '../../components/Loading';

const ManageAllTournaments = () => {
    const [loading,setloading] = useState(true);
    const [tournaments,setTournaments] = useState([]);
    const [auth] = useAuth();

    const navigate = useNavigate();

    const getTournaments = async ()=>{
        try {
            setloading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/get-tournaments`,{
                headers:{
                    Authorization:auth?.token
                }
            });
            if(data?.success){
                setTournaments(data.tournaments);
                setloading(false);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setloading(false);
        }
    }

    useEffect(()=>{
        getTournaments();
        //eslint-disable-next-line
    },[])

    const handleDelete = async(e)=>{
        const deletion = window.confirm('Are you sure to delete the tournament');
        if(!deletion) return;
        try {
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/delete-tournament/${e.target.value}`)
            if(data?.success){
                toast.success('Tournament deleted');
                getTournaments();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }
  return (
    <Layout title='Manage Tournaments'>
        <div className="container-fluid lt-bg-gradient mt-2" style={{minHeight:"72vh"}}>
            <div className="row">
            <div className="col-md-3 mt-3">
                <AdminSideMenu/>
                </div>
                <div className="col-md-9">
                    <div className='row text-center mb-2'>
                        <div className="col">
                            <h1>ALL TOURMANENTS</h1>
                        </div>
                    </div>
                    {!loading&&<div className="row text-center">
                        <div className="col d-flex flex-wrap justify-content-center">
                            {tournaments.length>0?tournaments.map(t=>(
                                <div className="card lt-card-color mb-3 ms-3" style={{width: '18rem '}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{t.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Venue : {t.venue}</h6>
                                        <p className="card-text">From : {t.fromDate}</p>
                                        <p className="card-text">To : {t.toDate}</p>
                                        <div className="ms-1">
                                            <button onClick={()=>navigate(`/manage-tournament/${t.slug}`)} className='btn btn-primary ms-2'>Manage</button>
                                            <button value={t._id} onClick={(e)=>{handleDelete(e)}} className='btn btn-danger ms-2'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )):
                                <h5 className='text-center'>No Tournaments to manage</h5>
                            }
                        </div>
                    </div>}
                    {
                        loading&&
                        <Loading/>
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ManageAllTournaments