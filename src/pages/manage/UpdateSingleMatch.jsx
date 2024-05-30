import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { TiDeleteOutline } from 'react-icons/ti';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Loading from '../../components/Loading';


const UpdateSingleMatch = ({mid,stateSetter}) => {
    const [loading,setloading] = useState(true);
    const [updating,setupdating] = useState(false);
    const [teamNames,setTeamNames] = useState({teamA:"",teamB:""});
    const [teamPlayers,setTeamPlayers] = useState({teamA:[],teamB:[]});
    const [scores,setScores] = useState({});
    const [matchDate,setMatchDate] = useState("");
    const [matchResult,setMatchResult] = useState("");

    const getMatchDetails = async()=>{
        setloading(true);
        const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/get-single-match/${mid}`);
        if(data?.success){
            setTeamNames({...teamNames,teamA:data.match.teamA.teamName,teamB:data.match.teamB.teamName});
            setTeamPlayers({...teamPlayers,teamA:[...data.match.teamA.teamPlayers],teamB:[...data.match.teamB.teamPlayers]});
            setMatchDate(data.match.matchDate);
            setScores({...data.match.scores});
            setMatchResult(data.match.matchResult);
            setloading(false);
        }else{
            toast.error(data?.message);
            setloading(false);
        }
    }

    useEffect(()=>{
        getMatchDetails();
    },[]);

    const handleUpdate = async(e)=>{
        e.preventDefault();
        try {
            setupdating(true);
            const {data} = await axios.put(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/update-match/${mid}`,{
                teamA:{
                    teamName:teamNames.teamA,
                    teamPlayers:teamPlayers.teamA
                },
                teamB:{
                    teamName:teamNames.teamB,
                    teamPlayers:teamPlayers.teamB
                },
                matchDate,
                scores,
                matchResult
            });
            if(data?.success){
                toast.success(data?.message);
                stateSetter(false);
                setupdating(false);
            }else{
                toast.error(data?.message);
                setupdating(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setupdating(false);
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
            let newTeamB= [...teamPlayers.teamB];
            newTeamB.splice(ind,1);
            setTeamPlayers({teamA:[...newTeamA],teamB:[...newTeamB]});
        }
    }

    const handleNameChange = (oldName,newName)=>{
        if(scores.sets.length>0){
            let newScores = {...scores};
            for(let i = 0; i < scores.sets.length; i++){
                for(let j = 0; j < scores.sets[i].length; j++){
                    if(scores.sets[i][j].result===oldName){
                        scores.sets[i][j].result=newName;
                    }
                }
                if(scores.setResult[i]===oldName){
                    scores.setResult[i]=newName;
                }
            }
            setScores({...newScores});
        }
        if(matchResult===oldName) setMatchResult(newName);
    }

    const handleBack = ()=>{
        stateSetter(false);
    }

  return (
    <>
        {
            !loading&&
            <div className='container-fluid p-0 mb-3'>
                <div className="row h-25 mt-3">
                    <div className="col d-flex flex-row justify-content-start">
                        <div onClick={()=>handleBack()}><IoArrowBackCircleOutline size={30} /></div>
                    </div>
                </div>
                <div className='row text-center'>
                    <div className="col">
                        <h4>UPDATE MATCH DETAILS</h4>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col d-flex flex-wrap justify-content-center">
                        <div className="card lt-card-color" style={{width: '18rem '}}>
                            <div className="card-body align-content-center">
                                <form onSubmit={(e)=>handleUpdate(e)}>
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text" style={{color:"red",fontWeight:"bold"}}  id="inputGroup-sizing-sm">First Team</span>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            aria-label="Sizing example input" 
                                            aria-describedby="inputGroup-sizing-sm" 
                                            placeholder='Team Name'
                                            value={teamNames.teamA}
                                            onChange={async (e)=>{handleNameChange(teamNames.teamA, e.target.value);setTeamNames({...teamNames,teamA:e.target.value});}}
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
                                            onChange={(e)=>{handleNameChange(teamNames.teamB, e.target.value);setTeamNames({...teamNames,teamB:e.target.value});}}
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
                                    <button type="submit" className="btn btn-primary" disabled={updating?true:false}>UPDATE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        {
        loading&&
            <Loading/>
        }
    </>
  )
}

export default UpdateSingleMatch