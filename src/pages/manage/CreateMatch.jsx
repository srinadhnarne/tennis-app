import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {TiDeleteOutline} from 'react-icons/ti';
import Layout from '../../components/Layout/Layout';
import { Link,useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const CreateMatch = () => {
    const [teamNames,setTeamNames] = useState({teamA:"",teamB:""});
    const [teamPlayers,setTeamPlayers] = useState({teamA:[],teamB:[]});
    const [matchDate,setMatchDate] = useState("");
    const [user,setUser] = useState(false);
    const [tid,setTid] = useState("");

    const delay = async (ms) => new Promise(
        resolve => setTimeout(resolve, ms)
    );
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

    const handleCreate = async(e)=>{
        e.preventDefault();
        try {
            console.log(tid);
            const {data} = await axios.post(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/create-match`,{
                tournament:tid,
                teamA:{
                    teamName:teamNames.teamA,
                    teamPlayers:teamPlayers.teamA
                },
                teamB:{
                    teamName:teamNames.teamB,
                    teamPlayers:teamPlayers.teamB
                },
                matchDate
            });
            if(data?.success){
                toast.success(data?.message);
                await delay(500);
            }else{
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    const handleAddDiv = ()=>{
        let newTeamPlayers = teamPlayers;
        newTeamPlayers.teamA.push("");
        newTeamPlayers.teamB.push("");
        setTeamPlayers({...newTeamPlayers});
    }
    
    const handleDelete = (e)=>{
        let ind = null;
        if(e.target.nodeName==='path') {ind = e.target.parentNode.parentNode.id;}
        else if(e.target.nodeName==='svg') {ind = e.target.parentNode.id;}
        else{
            ind = e.target.id;
        }
        if(ind){
            let newTeamA = [...teamPlayers.teamA];
            newTeamA.splice(ind,1);
            console.log(newTeamA)
            let newTeamB= [...teamPlayers.teamB];
            newTeamB.splice(ind,1);
            console.log(newTeamB);
            setTeamPlayers({teamA:[...newTeamA],teamB:[...newTeamB]});
        }
    }

  return (
    <Layout>
        {
            user===true?(
            <div className="container-fluid lt-bg-gradient" style={{minHeight:"72vh"}}>
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
                                    <div className='container-fluid'>
                                        <div className='row text-center mb-2 mt-3'>
                                            <div className="col">
                                                <h1>NEW MATCH</h1>
                                            </div>
                                        </div>
                                        <div className="row text-center">
                                            <div className="col d-flex flex-wrap justify-content-center">
                                                <div className="card lt-card-color" style={{width: '18rem '}}>
                                                    <div className="card-body align-content-center">
                                                        <form onSubmit={(e)=>handleCreate(e)}>
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" style={{color:"red",fontWeight:"bold"}}  id="inputGroup-sizing-sm">First Team</span>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    aria-label="Sizing example input" 
                                                                    aria-describedby="inputGroup-sizing-sm" 
                                                                    placeholder='Team Name'
                                                                    value={teamNames.teamA}
                                                                    style={{textTransform:"uppercase"}}
                                                                    onChange={(e)=>{setTeamNames({...teamNames,teamA:e.target.value});}}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="input-group input-group-sm mb-3">
                                                                <span className="input-group-text" style={{color:"blue",fontWeight:"bold"}}  id="inputGroup-sizing-sm">Second Team</span>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    aria-label="Sizing example input" 
                                                                    aria-describedby="inputGroup-sizing-sm" 
                                                                    placeholder='Team Name'
                                                                    value={teamNames.teamB}
                                                                    style={{textTransform:"uppercase"}}
                                                                    onChange={(e)=>{setTeamNames({...teamNames,teamB:e.target.value});}}
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
                                                                    value={matchDate}
                                                                    onChange={(e)=>{setMatchDate(e.target.value);}}
                                                                    required
                                                                />
                                                            </div>
                                                            {teamPlayers?.teamA?.map((t,index)=>(
                                                                <div>
                                                                    <div className='d-flex justify-content-end mb-2'><div id={index} onClick={(e)=>{handleDelete(e)}}><TiDeleteOutline/></div></div>
                                                                    <div className="input-group input-group-sm mb-3">
                                                                        <span className="input-group-text" style={{color:"red",fontWeight:"bold"}} id="inputGroup-sizing-sm">Player {index+1}</span>
                                                                        <input 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            aria-label="Sizing example input" 
                                                                            aria-describedby="inputGroup-sizing-sm" 
                                                                            placeholder='Player Name'
                                                                            value={teamPlayers.teamA[index]}
                                                                            onChange={(e)=>{
                                                                                let newPlayers = [...teamPlayers.teamA];
                                                                                newPlayers[index]=e.target.value;
                                                                                setTeamPlayers({...teamPlayers,teamA:[...newPlayers]});
                                                                            }}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div className="input-group input-group-sm mb-3">
                                                                        <span className="input-group-text" style={{color:"blue",fontWeight:"bold"}}  id="inputGroup-sizing-sm">Player {index+1}</span>
                                                                        <input 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            aria-label="Sizing example input" 
                                                                            aria-describedby="inputGroup-sizing-sm" 
                                                                            placeholder='Player Name'
                                                                            value={teamPlayers.teamB[index]}
                                                                            onChange={(e)=>{
                                                                                let newPlayers = [...teamPlayers.teamB];
                                                                                newPlayers[index]=e.target.value;
                                                                                setTeamPlayers({...teamPlayers,teamB:[...newPlayers]});
                                                                            }}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className='input-group input-group-sm mb-3'>
                                                                <button className='btn btn-secondary' onClick={()=>handleAddDiv()}>Add Players</button>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary">CREATE</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default CreateMatch