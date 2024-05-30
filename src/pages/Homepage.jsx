import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Homepage = () => {
  const [loading,setloading] = useState(true);
  const [recentMatches,setRecentMatches] = useState();
  const navigate = useNavigate();
  const getRecentMatches = async()=>{
    try {
      setloading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/matches/get-updated-matches`);
      if(data?.success){
        setRecentMatches(data.matches);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  useEffect(()=>{
    getRecentMatches();
  },[]);

  return (
    <Layout>
      {!loading&&
        <div className="container-fluid pt-3 pb-3 lt-bg-gradient" style={{minHeight:"72vh"}}>
          <div className="row text-center">
            <div className="col">
              <h3>RECENT MATCHES</h3>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex flex-wrap gap-3 justify-content-center">
              {
                recentMatches?.map((m)=>(
                  <>
                    <div className="card" style={{width: '22rem'}}>
                      <div className="card-body">
                        <div className="card-title d-flex flex-row gap-3 gap-lg-4 flex-row justify-content-center">
                          <div className='d-flex flex-column'>
                              <h5 className='mb-1 d-flex justify-content-center'>{m?.teamA?.teamName}</h5>
                              {   
                                  m.teamA.teamPlayers&&
                                  <div className='d-flex flex-column'>
                                      {
                                          m.teamA.teamPlayers.map(player=>(
                                              <div className='mb-1 d-flex justify-content-center'>{player}</div>
                                          ))
                                      }
                                  </div>
                              }
                          </div>
                          <div className='align-content-center'>
                              VS
                          </div>
                          <div>
                              <h5 className='mb-1 d-flex justify-content-center'>{m?.teamB?.teamName}</h5>
                              {   
                                  m.teamB.teamPlayers&&
                                  <div className='d-flex flex-column justify-content-center'>
                                      {
                                          m.teamB.teamPlayers.map(player=>(
                                              <div className='mb-1 d-flex justify-content-center'>{player}</div>
                                          ))
                                      }
                                  </div>
                              }
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-center mb-2">
                        <p className="card-text mt-2 justify-content-center">Match Date : {m?.matchDate}</p>
                      </div>
                      <button onClick={()=>navigate(`/match-summary/${m._id}`)} className='btn btn-primary p-3'>More Details</button>
                  </div>

                  </>
                ))
              }
            </div>
          </div>
        </div>
      }
      {
        loading&&
        <Loading/>
      }
    </Layout>
  )
}

export default Homepage