import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaSquare } from 'react-icons/fa';

const MatchSummary = () => {
  const [tournament,setTournament] = useState();
    const [matches,setMatches] = useState([]);
    const [teamNames,setTeamNames] = useState({teamA:"",teamB:""});
    const [teamPlayers,setTeamPlayers] = useState({teamA:[],teamB:[]});
    const [matchDate,setMatchDate] = useState("");
    const [matchResult, setMatchResult] = useState("");
    const [scores,setscores] = useState({});

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

    const getMatchDetails = async()=>{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/get-single-match/${params.id}`);
      if(data?.success){
          setTeamNames({...teamNames,teamA:data.match.teamA.teamName,teamB:data.match.teamB.teamName});
          setTeamPlayers({...teamPlayers,teamA:[...data.match.teamA.teamPlayers],teamB:[...data.match.teamB.teamPlayers]});
          setMatchDate(data.match.matchDate);
          setMatchResult(data.match.matchResult);
          setscores({...data.match.scores});
      }else{
          toast.error(data?.message);
      }
  }
  
  useEffect(()=>{
      getMatchDetails();
  },[]);

  return (
    <Layout>
        <div className="conainer-fluid pt-3 text-center">
          <div className="row h-25">
            <div className="col d-flex flex-row justify-content-start ms-2">
                <div onClick={()=>navigate(-1)}><IoArrowBackCircleOutline size={50} /></div>
            </div>
          </div>
          {/* <div className="row text-center">
            <div className="col">
              <h2>MATCH SUMMARY</h2>
            </div>
          </div> */}
          <div className="row">
            <div className="col">
              <div className="row text-center">
                <div className="col">
                  <h2>MATCH SUMMARY</h2>
                </div>
              </div> 
              <div className="row">
                <div className="col">
                  <div className="row h-25 mt-3">
                    <div className="col d-flex flex-row justify-content-center p-0">
                      <div className="card lt-card-color" style={{ width: '22rem' }}>
                        <div className="card-body align-content-center">
                          <div className="row mb-2">
                            <div className="col">
                              <h4>{tournament?.name}</h4>
                            </div>
                          </div>
                          <div className="row text-center">
                            <div className="col d-flex gap-4 flex-row flex-sm-row justify-content-center align-content-center">
                              <div className="flex-sm-grow-2">
                                <h5 className="card-title">{teamNames.teamA}</h5>
                                <div>
                                  {teamPlayers?.teamA?.map(player => (
                                    <div>{player}</div>
                                  ))}
                                </div>
                              </div>
                              <div className='d-flex justify-content-center align-items-center'>
                                <div >VS</div>
                              </div>
                              <div className="flex-sm-grow-2">
                                <h5 className="card-title">{teamNames.teamB}</h5>
                                <div>
                                  {teamPlayers?.teamB?.map(player => (
                                    <div>{player}</div>
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
                                {matchResult}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col d-flex flex-column justify-content-center">
                  {scores?.sets?.map((s,index)=>(
                    <div className='row  mb-3'>
                      <div className="col d-flex justify-content-center">
                        <div className="card" style={{minWidth:"25rem"}}>
                          <div className="card-body">
                            <div className="row text-center mb-2">
                              <div className="col">
                                <h4 className='fw-bold'>SET {index+1}</h4>
                              </div>
                            </div>
                            {
                                <div>
                                  <table className="table table-striped table-hover table-bordered border-dark">
                                    <thead>
                                      <tr>
                                        <th scope="col">GAME</th>
                                        <th scope="col">{teamNames.teamA}</th>
                                        <th scope="col">{teamNames.teamB}</th>
                                        <th scope="col">WINNER</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {s.map((g,ind)=>(
                                      <tr>
                                        <th scope="row">{ind+1}</th>
                                        <td>{g.teamA}</td>
                                        <td>{g.teamB}</td>
                                        <td>{g.result}</td>
                                      </tr>
                                      ))}
                                      <tr>
                                        <th scope='col'>GAME RESULT</th>
                                        <td colSpan={3}>{scores.gameResult[index][0]} - {scores.gameResult[index][1]}</td>
                                      </tr>
                                      <tr>
                                        <th scope='col'>SET RESULT</th>
                                        <td className="fw-bold" style={{textTransform:"uppercase"}} colSpan={3}>{scores.setResult[index]}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {matches.length>1&&<div className="col-md-4">
              {matches&&<div className="row  mb-3">
                  <div className="col d-flex flex-wrap justify-content-center">
                      {matches.length>0?(matches?.map(m=>(
                        m._id!==params.id&&(
                          <div>
                              <div className="card  m-3" style={{width: '18rem ', height:"15rem"}}>
                                  <div className="card-body d-flex flex-column gap-2 justify-content-center">
                                      <div className="row text-center">
                                          <div className="col d-flex gap-2 flex-wrap justify-content-center align-content-center">
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
                                  <button onClick={()=>navigate(`/match-summary/${params.slug}/${m._id}`)} className='btn btn-primary p-3'>More Details</button>
                              </div>
                          </div>)
                      ))):(
                          <div>
                              No matches to display
                          </div>
                      )}
                  </div>
              </div>}
            </div>}
          </div>
        </div>
    </Layout>
  )
}

export default MatchSummary