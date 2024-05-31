import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Loading from '../components/Loading';

const TournamentDetails = () => {
    const [loading,setloading] = useState(true);
    const [tournament,setTournament] = useState();
    const [matches,setMatches] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    const getTournament = async ()=>{
        try{
            setloading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/get-tournament/${params.slug}`);
            if(data?.success){
                setTournament(data.tournament);
            }else{
                toast.error(data?.message);
            }
        } catch(error){
            console.log(error);
            toast.error('Somethng went wrong');
        }
    }

    const getMatches = async()=>{
        try{
            setloading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/get-matches/${tournament._id}`);
            if(data?.success){
                setMatches(data.matches);
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
        getTournament();
    },[])

    useEffect(()=>{
        getMatches();
    },[tournament])

  return (
    <Layout title={`${tournament?.name}`}>
        {!loading&&<div className='container-fluid text-center lt-bg-gradient p-3'style={{minHeight:"72vh"}} >
            <div className="row">
                <div className="col d-flex flex-row justify-content-start ms-2">
                    <div onClick={()=>navigate(-1)}><IoArrowBackCircleOutline size={40} /></div>
                </div>
                <div className="col">
                    <h1>TOURNAMENT DETAILS</h1>
                </div>
                <div className='col'>
                </div>
            </div>
            <div className="row pt-2 mb-3">
                <div className="col d-flex flex-column justify-content-center">
                    {tournament&&
                        <div className='d-flex justify-content-center pt-2'>
                            <div className='card lt-card-color d-flex flex-wrap justify-content-center' style={{width:"18rem"}}>
                                <h3 className="card-title">{tournament.name}</h3>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Venue : {tournament.venue}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">From : {tournament.fromDate}</h6>
                                <h6 className="card-subtitle mb-2 text-body-secondary">To : {tournament.toDate}</h6>
                                {tournament.organiser&&
                                <div className='card-title d-flex flex-column justify-content-start'>
                                    <h5>ORGANISER</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Name : {tournament?.organiser?.name}</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Email : {tournament?.organiser?.email}</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Phone Number : {tournament.organiser?.phone}</h6>
                                </div>
                                }
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
                                                <h5 className="card-title">{m.teamA.teamName}</h5>
                                                <div>
                                                    {m.teamA.teamPlayers?.map(player=>(
                                                        <div >{player}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                    VS
                                            </div>
                                            <div className="flex-sm-grow-1">
                                                <h5 className="card-title">{m.teamB.teamName}</h5>
                                                <div>
                                                    {m.teamB.teamPlayers.map(player=>(
                                                        <div >{player}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-text mb-2">Match Date : {m.matchDate}</div>
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
        </div>}
        {
            loading&&<Loading/>
        }
    </Layout>
  )
}

export default TournamentDetails