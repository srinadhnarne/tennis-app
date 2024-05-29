import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTournament = ({tid}) => {
    const [name,setName] = useState("");
    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");
    const [venue,setVenue] = useState("");

    const params = useParams();

    const getTournament = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/get-tournament/${params.slug}`)
            if(data?.success){
                setName(data.tournament.name);
                setVenue(data.tournament.venue);
                setFromDate(data.tournament.fromDate);
                setToDate(data.tournament.toDate);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    useEffect(()=>{
        getTournament();
        //eslint-disable-next-line
    },[]);

    const handleUpdate = async(e)=>{
        e.preventDefault();
        try {
            const{data} = await axios.put(`${process.env.REACT_APP_API}/lawntennis/api/v1/tournament/update-tournament/${tid}`,{
                name,
                fromDate,
                toDate,
                venue
            })
            if(data?.success){
                toast.success(data.message);
            } else{
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
  return (
    <div className='container-fluid'>
        <div className='row text-center mb-2'>
            <div className="col">
                <h1>UPDATE TOURNAMENT</h1>
            </div>
        </div>
        <div className="row text-center">
            <div className="col d-flex flex-wrap justify-content-center">
                <div className="card lt-card-color" style={{width: '18rem '}}>
                    <div className="card-body align-content-center">
                        <form onSubmit={(e)=>handleUpdate(e)}>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputName1" 
                                    aria-describedby="emailHelp" 
                                    placeholder='Tournament Name' 
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputName1" 
                                    aria-describedby="emailHelp" 
                                    placeholder='Tournament Venue' 
                                    value={venue}
                                    onChange={(e)=>setVenue(e.target.value)}
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
                                    value={fromDate}
                                    onChange={(e)=>{setFromDate(e.target.value);}}
                                    required
                                />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">To</span>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    aria-label="Sizing example input" 
                                    aria-describedby="inputGroup-sizing-sm" 
                                    value={toDate}
                                    onChange={(e)=>{setToDate(e.target.value);}}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateTournament