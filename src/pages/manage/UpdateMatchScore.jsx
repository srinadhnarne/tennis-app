import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { TiDeleteOutline } from 'react-icons/ti';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaSquare } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Spinner from '../../components/Spinner';
import Loading from '../../components/Loading';

const UpdateMatchScore = () => {
    const [loading,setloading] = useState(true);
    const [saving,setsaving] = useState(false);
    const [teamNames,setTeamNames] = useState({teamA:"",teamB:""});
    const [teamPlayers,setTeamPlayers] = useState({teamA:[],teamB:[]});
    const [matchDate,setMatchDate] = useState("");
    const [matchResult, setMatchResult] = useState("");
    const [scores,setscores] = useState({});
    const scoreboard=["0","15","30","40","AD"];
    const [user,setUser] = useState(false);
    const [tid,setTid] = useState("");
    const params = useParams();
    const token = JSON.parse(localStorage.getItem('tennis-auth'))?.token;
    const verifyuser = async()=>{
        try {
            setloading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/verify-tournament-organiser/${params.slug}`,{
                headers:{
                    Authorization:token
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

    const navigate = useNavigate();

    const getMatchDetails = async()=>{
        setloading(true);
        const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/get-single-match/${params.id}`);
        if(data?.success){
            setTeamNames({...teamNames,teamA:data.match.teamA.teamName,teamB:data.match.teamB.teamName});
            setTeamPlayers({...teamPlayers,teamA:[...data.match.teamA.teamPlayers],teamB:[...data.match.teamB.teamPlayers]});
            setMatchDate(data.match.matchDate);
            setMatchResult(data.match.matchResult);
            setscores({...data.match.scores});
            setloading(false);
        }else{
            toast.error(data?.message);
            setloading(false);
        }
    }
    
    useEffect(()=>{
        getMatchDetails();
    },[tid]);

    const handleScoreChange = (e)=>{
        const score = e.target.innerHTML;
        let [set,game,team] = e.target.parentElement.id.split('-');
        set = Number(set);
        game = Number(game);
        let newSet = {...scores};
        newSet.sets[set][game] =  team==="teamA"?{...newSet.sets[set][game],teamA:score}:{...newSet.sets[set][game],teamB:score};
        setscores({...newSet});
    }

    const handleAddGame = (e)=>{
        let newSet= {...scores};
        newSet.sets[e.target.id].push({
            teamA:"0",
            teamB:"0",
            result:"NA"
        })
        setscores({...newSet});
    }

    const handleAddSet = ()=>{
        let newSet = {...scores};
        if(newSet.sets.length===0){
            newSet.sets=[[{
                teamA:"0",
                teamB:"0",
                result:"NA"
            }]];
            newSet.gameResult=[[0,0]];
            newSet.setResult=["NA"];
        }else{
            newSet.sets.push([{
                teamA:"0",
                teamB:"0",
                result:"NA"
            }]);
            newSet.gameResult.push([0,0]);
            newSet.setResult.push("NA");
        }
        setscores({...newSet})
    }

    const handleSave = async ()=>{
        try {
            setsaving(true);
            const {data} = await axios.put(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/update-match/${params.id}`,{
                scores,matchResult
            })
            if(data?.success){
                toast.success('Score Updated');
                setsaving(false);
            } else{
                toast.error(data?.message);
                setsaving(false);
            }
        } catch (error) {
            console.log(error)
            setsaving(false);
        }
    }

    const handleGameWin = (e)=>{
        const winningTeam = e.target.value;
        let [set,game] = e.target.id.split('-');
        set = Number(set);
        game = Number(game);
        let newSet = {...scores};
        if(winningTeam===teamNames.teamA){
            if(newSet.gameResult[set][1]>0&&newSet.sets[set][game].result!=='NA') newSet.gameResult[set][1]=newSet.gameResult[set][1]-1;
            newSet.gameResult[set][0]=newSet.gameResult[set][0]+1;
        }else if(winningTeam===teamNames.teamB) {
            if(newSet.gameResult[set][0]>0&&newSet.sets[set][game].result!=='NA') newSet.gameResult[set][0]=newSet.gameResult[set][0]-1;
            newSet.gameResult[set][1]=newSet.gameResult[set][1]+1;
        } else{
            if(newSet.sets[set][game].result===teamNames.teamA) newSet.gameResult[set][0]=newSet.gameResult[set][0]-1;
            if(newSet.sets[set][game].result===teamNames.teamB) newSet.gameResult[set][1]=newSet.gameResult[set][1]-1;
        }
        newSet.sets[set][game] = {...newSet.sets[set][game],result:winningTeam};
        setscores({...newSet});
    }

    const handleSetWin = (e)=>{
        const winningTeam = e.target.value;
        let set = e.target.id;
        set = Number(set);
        let newSet = {...scores};
        newSet.setResult[set]=winningTeam;
        setscores({...newSet});
    }

    const handleHistory = (e)=>{
        const id = e.target.id?e.target.id.split('-'):e.target.parentElement.id.split('-');
        const [set,game] = [Number(id[0]),Number(id[1])]; 
        const confirmed = window.confirm(`Are you sure to delete the Game ${game+1} of Set ${set+1}?`);
        if(!confirmed) return;
        let newSet= {...scores};
        if(newSet.sets[set][game].result===teamNames.teamA) newSet.gameResult[set][0]=newSet.gameResult[set][0]-1;
        if(newSet.sets[set][game].result===teamNames.teamB) newSet.gameResult[set][1]=newSet.gameResult[set][1]-1;
        newSet.sets[id[0]].splice(id[1],1);
        newSet.setResult[set]="NA"
        setscores({...newSet});
    }

    const handleDeleteSet = (e)=>{
        const setInd = e.target.id?Number(e.target.id):Number(e.target.parentElement.id);
        const confirmed = window.confirm(`Are you sure to delete the set ${(setInd)+1}?`);
        if(!confirmed) return;
        let newSet = {...scores};
        newSet.sets.splice(setInd,1);
        newSet.setResult.splice(setInd,1);
        newSet.gameResult.splice(setInd,1);
        setscores({...newSet});
    }

  return (
    <Layout>
        {!loading&&user===true?
            (<div className='container-fluid p-0'>
                <div className="row h-25 mt-2">
                    <div className="col d-flex flex-row justify-content-start ms-2">
                        <div onClick={()=>navigate(-1)}><IoArrowBackCircleOutline size={50} /></div>
                    </div>
                </div>
                <div className="row h-25 mt-3">
                    <div className="col d-flex flex-row justify-content-center p-0">
                        <div className="card lt-card-color" style={{width: '20rem'}}>
                            <div className="card-body align-content-center">
                                <div className="row text-center">
                                    <div className="col d-flex gap-2 flex-wrap justify-content-center align-content-center">
                                        <div className="flex-sm-grow-1">
                                            <h5 className="card-title text-success">{teamNames.teamA}</h5>
                                            <div>
                                                {teamPlayers?.teamA?.map(player=>(
                                                    <div className='text-success'>{player}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                                VS
                                        </div>
                                        <div className="flex-sm-grow-1">
                                            <h5 className="card-title text-info">{teamNames.teamB}</h5>
                                            <div>
                                                {teamPlayers?.teamB?.map(player=>(
                                                    <div className='text-info'>{player}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col d-flex justify-content-center align-items-center">
                                        <div>MATCH DATE : {matchDate}</div>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col d-flex flex-row gap-2 justify-content-center align-items-center">
                                        <div>
                                            MATCH WINNER : 
                                        </div>
                                        <div>
                                            <select value={matchResult} onChange={(e)=>{setMatchResult(e.target.value)}} className="form-select form-select-sm" aria-label="Small select example">
                                                <option>NA</option>
                                                <option >{teamNames.teamA}</option>
                                                <option >{teamNames.teamB}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row text-center mt-3'>
                    <div className="col">
                        <h4>UPDATE SCORE</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex flex-column justify-content-center">
                        {scores?.sets?.map((s,index)=>(
                            <div className='row  mb-3'>
                                <div className="col d-flex justify-content-center">
                                    <div className="card" >
                                        <div className="card-body">
                                            <div className="row mt-3 d-flex flex-column justify-content-start align-items-start">
                                                <div id={`${index}`} onClick={(e)=>handleDeleteSet(e)} className="col fw-bold d-flex justify-content-end align-items-center" data-toggle="tooltip" data-placement="top" title="Delete Set">
                                                    <TiDeleteOutline size={25} color='red' id={`${index}`}/>
                                                </div>
                                            </div>
                                            <div className="row mt-3 d-flex flex-column justify-content-start align-items-start">
                                                <div className="col fw-bold d-flex justify-content-end align-items-center">
                                                    <FaSquare color='green'/> : {teamNames.teamA}
                                                </div>
                                                <div className="col fw-bold d-flex justify-content-end align-items-center">
                                                    <FaSquare color='deepskyblue'/> : {teamNames.teamB}
                                                </div>
                                            </div>
                                            <div className="row text-center mb-2">
                                                <div className="col">
                                                    <h4 className='fw-bold'>SET {index+1}</h4>
                                                </div>
                                            </div>
                                            {s.map((g,ind)=>(
                                                <div className='d-flex gap-2 flex-row justify-content-evenly mb-3'>
                                                    <div className='col-md-3 d-flex gap-2 gap-lg-1 flex-column justify-content-center'>
                                                        <div className='d-flex justify-content-center fw-bold'>GAME {ind+1}</div>
                                                        <div className='d-flex flex-column flex-lg-row gap-1 justify-content-center'>
                                                            <div className='d-flex justify-content-center'>Won by</div> 
                                                            <div className='d-flex justify-content-center flex'>
                                                                <select id={`${index}-${ind}`} value={g.result} defaultValue={`${g.result}`} onChange={(e)=>handleGameWin(e)} className="form-select form-select-sm" aria-label="Small select example">
                                                                    <option>NA</option>
                                                                    <option >{teamNames.teamA}</option>
                                                                    <option >{teamNames.teamB}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="row">
                                                            <div className="col d-flex justify-content-end">
                                                                {/* <button id={`${index}-${ind}-back`} onClick={(e)=>handleHistory(e)} className='btn'><RxReset color='black' id={`${index}-${ind}-back`}/></button> */}
                                                                <button id={`${index}-${ind}-delete`} onClick={(e)=>handleHistory(e)} className='btn' data-toggle="tooltip" data-placement="top" title="Delete Game"><TiDeleteOutline size={20} color='red' id={`${index}-${ind}-delete`}/></button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col  d-flex flex-column flex-lg-row justify-content-center">
                                                                <div className='m-1 ms-3 ms-lg-1'>
                                                                    <ul id={`${index}-${ind}-teamA`} onClick={(e)=>{handleScoreChange(e)}} className="list-group list-group-horizontal">
                                                                        {scoreboard.map((value)=>{
                                                                            if(value===g.teamA){
                                                                                
                                                                                return (<li className="list-group-item text text-bg-success" value={value}>{value}</li>)
                                                                            }else{
                                                                                return (<li className="list-group-item" value={value}>{value}</li>)
                                                                            }
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                                <div className='m-1 ms-3 ms-lg-1'>
                                                                    <ul id={`${index}-${ind}-teamB`} onClick={(e)=>{handleScoreChange(e)}} className="list-group list-group-horizontal">
                                                                    {scoreboard.map((value)=>{
                                                                            if(value===g.teamB){
                                                                                return (<li className="list-group-item text text-bg-info" value={value}>{value}</li>)
                                                                            }else{
                                                                                return (<li className="list-group-item" value={value}>{value}</li>)
                                                                            }
                                                                    })}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="row mb-2">
                                                <div className="col d-flex flex-row gap-1 justify-content-center align-items-center">
                                                    <div>
                                                        GAME RESULT : 
                                                    </div>
                                                    <div className='text-success fw-bold'>
                                                        {scores.gameResult[index][0]}
                                                    </div>
                                                    <div >
                                                        -
                                                    </div>
                                                    <div className='text-info fw-bold'>
                                                        {scores.gameResult[index][1]}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col d-flex flex-row gap-1 justify-content-center align-items-center">
                                                    <div>
                                                        SET RESULT :
                                                    </div>
                                                    <div>
                                                        <select id={`${index}`} value={scores.setResult[index]} defaultValue={`${scores.setResult[index]}`} onChange={(e)=>handleSetWin(e)} className="form-select form-select-sm" aria-label="Small select example">
                                                            <option>NA</option>
                                                            <option >{teamNames.teamA}</option>
                                                            <option >{teamNames.teamB}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center mb-3">
                                                <div className="col">
                                                    <button id={index} onClick={(e)=>handleAddGame(e)} className='btn btn-outline-warning'>Add Game</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col d-flex flex-row justify-content-center gap-2">
                        <button onClick={()=>handleAddSet()} className='btn btn-secondary'>ADD NEW SET</button>
                        <button onClick={()=>handleSave()} className='btn btn-primary' disabled={saving?true:false}>SAVE CHANGES</button>
                    </div>
                </div>
            </div>):(
                loading?
                <Loading/>
                :
                <Spinner />
            )
        }
    </Layout>
  )
}

export default UpdateMatchScore