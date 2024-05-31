import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Spinner from '../../components/Spinner';
import {  Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import UpdateTournament from './UpdateTournament';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Loading from '../../components/Loading';

const ManageSingleTournament = () => {
    const [loading,setloading] = useState(true);
    const navigate = useNavigate();
    const [user,setUser] = useState(false);
    const [tid,setTid] = useState("");
    const params = useParams();
    const userDetails = JSON.parse(localStorage.getItem('tennis-auth'));
    const verifyuser = async()=>{
        try {
            setloading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/verify-tournament-organiser/${params.slug}`,{
                headers:{
                    Authorization:userDetails?.token
                }
            });
            if(data?.success){
                setUser(true);
                setTid(data.tournament._id);
                setloading(false);
            }else{
                setUser(false);
                toast.error(data?.message);
                setloading(false);
            }
        } catch (error) {
            console.log('Something went wrong');
            setloading(false);
        }
    }
    useEffect(()=>{
        verifyuser();
        //eslint-disable-next-line
    },[]);


  return (
    <Layout title={`${params?.slug} - Manage Tournament`}>
        {!loading&&   user===true?(
            <div className="container-fluid lt-bg-gradient" style={{minHeight:"72vh"}}>
                <div className="row text-center ">
                    <div className="col-md-3 mt-3 ">
                        <div className='list-group text-center border border-dark-subtle'>
                            <h1>MANAGE TOURNAMENT</h1>
                            <Link to={`/manage-tournament/${params.slug}`} className="list-group-item list-group-item-action">
                                UPDATE TOURNAMENT
                            </Link>
                            <Link to={`/create-match/${params.slug}`} className="list-group-item list-group-item-action">
                                CREATE MATCHES
                            </Link>
                            <Link to={`/update-matches/${params.slug}`}  className="list-group-item list-group-item-action">
                                UPDATE MATCHES
                            </Link>
                            <Link to={`/update-scores/${params.slug}`}  className="list-group-item list-group-item-action">
                                UPDATE SCORES
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-9 d-flex flex-column gap-2">
                        <div className="row mt-5">
                            <div className="col d-flex flex-row justify-content-start">
                                <div onClick={()=>{userDetails.user.role===1?(navigate('/dashboard/admin/manage-all-tournaments')):(navigate(`/my-tournaments`))}}><IoArrowBackCircleOutline size={35} /></div>
                            </div>
                        </div>
                        <div className="row text-center mb-3">
                            <div className="col d-flex flex-wrap justify-content-center">
                                <UpdateTournament tid={tid}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ):(
                loading?
                    <Loading/>
                    :
                    <Spinner path='/'/>
            )
        }
    </Layout>
  )
}

export default ManageSingleTournament