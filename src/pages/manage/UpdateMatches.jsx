import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import UpdateSingleMatch from './UpdateSingleMatch';
import Layout from '../../components/Layout/Layout';
import Spinner from '../../components/Spinner';

const UpdateMatches = () => {
    const [updateMatch,setUpdateMatch]=useState(false);
    const [currentMatchId,setCurrentMatchID] = useState(null);
    const [matches,setMatches] = useState();
    const [user,setUser] = useState(false);
    const [tid,setTid] = useState("");
    const params = useParams();
    const token = JSON.parse(localStorage.getItem('tennis-auth'))?.token;
    const verifyuser = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/verify-tournament-organiser/${params.slug}`,{
                headers:{
                    Authorization:token
                }
            });
            if(data?.success){
                setUser(true);
                setTid(data.tournament._id);
            }else{
                setUser(false);
                toast.error(data?.message)
            }
        } catch (error) {
            console.log('Something went wrong');
        }
    }
    useEffect(()=>{
        verifyuser();
        //eslint-disable-next-line
    },[]);

    const getMatches = async()=>{
        try {
            if(tid==="" ) return;
            const {data} =  await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/get-matches/${tid}`);
            if(data?.success){
                setMatches(data.matches);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(()=>{
        getMatches();
        //eslint-disable-next-line
    },[tid]);

    const stateSetter = (curr)=>{
        setUpdateMatch(curr);
        getMatches();
        setCurrentMatchID(null);
    }

    const handleDelete = async (e)=>{
        const confirmed = window.confirm('Are you sure to delete the match');
        if(!confirmed) return;
        try {
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/delete-match/${e.target.value}`);
            if(data?.success){
                toast.success(data?.message);
                getMatches();
            }else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

  return (
    <Layout>{
        user===true?
        (<div className="container-fluid lt-bg-gradient" style={{minHeight:"72vh"}}>
                <div className="row text-center">
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
                    <div className="col-md-9">
                        <div className="row text-center">
                            <div className="col d-flex flex-wrap justify-content-center">
                                <div className='container-fluid lt-bg-gradient mt-2' style={{minHeight:"72vh"}}>
                                    {
                                        updateMatch===false&&
                                        <>
                                            <div className="row">
                                                <div className="col">
                                                    <h4>UPDATE MATCH DETAILS</h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col d-flex flex-wrap justify-content-center">
                                                    {matches?.length>0?matches?.map(m=>(
                                                        <div className="card lt-card-color mb-3 ms-3" style={{width: '18rem '}}>
                                                            <div className="card-body">
                                                                <div className='card-title gap-3 gap-lg-4 d-flex flex-row justify-content-center'>
                                                                    <div className='d-flex flex-column'>
                                                                        <h5>{m?.teamA?.teamName}</h5>
                                                                        {   
                                                                            m.teamA.teamPlayers&&
                                                                            <div className='d-flex flex-column'>
                                                                                {
                                                                                    m.teamA.teamPlayers.map(player=>(
                                                                                        <div className='mb-1'>{player}</div>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    <div className='align-content-center'>
                                                                        VS
                                                                    </div>
                                                                    <div>
                                                                        <h5>{m?.teamB?.teamName}</h5>
                                                                        {   
                                                                            m.teamB.teamPlayers&&
                                                                            <div className='d-flex flex-column'>
                                                                                {
                                                                                    m.teamB.teamPlayers.map(player=>(
                                                                                        <div>{player}</div>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                <p className="card-text mt-2">Match Date : {m?.matchDate}</p>
                                                                <div className="ms-1 mb-3">
                                                                    <button value={m._id} onClick={(e)=>{setCurrentMatchID(e.target.value);setUpdateMatch(true)}} className='btn btn-primary ms-2'>UPDATE</button>
                                                                    <button value={m._id} onClick={(e)=>{handleDelete(e)}} className='btn btn-danger ms-2'>Delete</button>
                                                                </div>
                                                        </div>
                                                    )):
                                                        <h5 className='text-center'>No Matches to manage</h5>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        updateMatch&&<UpdateSingleMatch mid={currentMatchId} stateSetter={stateSetter}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>):(
                <Spinner path='/'/>
            )
        }
    </Layout>
  )
}

export default UpdateMatches