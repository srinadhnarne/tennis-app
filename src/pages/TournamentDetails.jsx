import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const TournamentDetails = () => {
    const [tournament,setTournament] = useState();
    const [matches,setMatches] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    const getTournament = async ()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/get-tournament/${params.slug}`);
            if(data?.success){
                setTournament(data.tournament);
            }else{
                toast.error(data?.message);
            }
        } catch(error){
            console.log(error);
        }
    }

    const getMatches = async()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/get-matches/${tournament._id}`);
            if(data?.success){
                setMatches(data.matches);
                // console.log(data.matches,matches);
            }else{
                toast.error(data?.message);
            }
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getTournament();
        
    },[])

    useEffect(()=>{
        getMatches();
    },[tournament])

  return (
    <Layout>
        <div className='container-fluid text-center lt-bg-gradient p-5'style={{minHeight:"72vh"}} >
            <div className="row h-25">
                <div className="col d-flex flex-row justify-content-start ms-2">
                    <div onClick={()=>navigate(-1)}><IoArrowBackCircleOutline size={50} /></div>
                </div>
            </div>
            <div className="row pt-4 mb-3">
                <div className="col d-flex flex-column justify-content-center">
                    <h1>TOURNAMENT DETAILS</h1>
                    {tournament&&
                        <div className='d-flex justify-content-center pt-2'>
                            <div className='card lt-card-color d-flex flex-wrap justify-content-center' style={{width:"18rem"}}>
                                <h3 className="card-title">{tournament.name}</h3>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Venue : {tournament.venue}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">From : {tournament.fromDate}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">To : {tournament.toDate}</h6>
                                <div className='card-title d-flex flex-column justify-content-start'>
                                    <h5>ORGANISER</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Name : {tournament.organiser.name}</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Email : {tournament.organiser.email}</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Phone Number : {tournament.organiser.phone}</h6>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="row pt-4 pb-2">
                <div className="col">
                    <h3>MATCHES</h3>
                </div>
            </div>
            {matches&&<div className="row  mb-3">
                <div className="col d-flex gap-3 flex-wrap justify-content-center">
                    {matches.length>0?(matches?.map(m=>(
                        <div>
                            <div className="card" style={{width: '22rem ', height:"15rem"}}>
                                <div className="card-body d-flex flex-column gap-2 justify-content-center">
                                    <div className="row text-center">
                                        <div className="col d-flex gap-3 flex-wrap justify-content-center align-content-center">
                                            <div className="flex-sm-grow-1">
                                                <h5 className="card-title text-success">{m.teamA.teamName}</h5>
                                                <div>
                                                    {m.teamA.teamPlayers?.map(player=>(
                                                        <div className='text-success'>{player}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                    VS
                                            </div>
                                            <div className="flex-sm-grow-1">
                                                <h5 className="card-title text-info">{m.teamB.teamName}</h5>
                                                <div>
                                                    {m.teamB.teamPlayers.map(player=>(
                                                        <div className='text-info'>{player}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-text">Match Date : {m.matchDate}</div>
                                </div>
                                    <button onClick={()=>navigate(`/match-summary/${m._id}`)} className='btn btn-primary p-3'>More Details</button>
                            </div>
                        </div>
                    ))):(
                        <div>
                            No matches to display
                        </div>
                    )}
                </div>
            </div>}
        </div>
    </Layout>
  )
}

export default TournamentDetails