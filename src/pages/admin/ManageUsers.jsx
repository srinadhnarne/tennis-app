import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminSideMenu from '../../components/Helpers/AdminSideMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import UpdateUser from './UpdateUser';

const ManageUsers = () => {
    const [currentUserId,setCurrentUserID] = useState(null);
    const [users,setUsers] = useState();
    const getAllUsers = async ()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/get-users`);
            if(data?.success){
                setUsers(data.users);
            }else{
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(()=>{
        getAllUsers();
    },[]);

    const stateSetter = (curr)=>{
        setCurrentUserID(curr);
        getAllUsers();
    }

    const handleDelete = async (e)=>{
        const confirmed = window.confirm('Are you sure to delete user');
        if(!confirmed) return;
        try {
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/lawntennis/api/v1/auth/delete-user/${e.target.value}`);
            if(data?.success){
                toast.success(data?.message);
                getAllUsers();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

  return (
    <Layout>
        <div className='container-fluid lt-bg-gradient pt-4' style={{minHeight:"72vh"}}>
            <div className="row">
                <div className="col-md-3">
                    <AdminSideMenu/>
                </div>
                <div className="col-md-8">
                    
                    {
                        currentUserId === null &&
                        <>
                            <div className="row text-center mt-3 mt-lg-0">
                                <div className="col">
                                    <h4>ALL USER DETAILS</h4>
                                </div>
                            </div>
                            <div className="row test-center">
                                <div className="col d-flex flex-wrap justify-content-center">
                                    {users?.length > 0 ? users?.map(u => (
                                        <div className="card lt-card-color ms-lg-2 mb-3" style={{ minWidth: '22rem' }}>
                                            <div className="card-body">
                                                <div className="row text-center">
                                                    <div className="col">
                                                        <h5>{u.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="row d-flex flex-column justify-content-center">
                                                    <div className='d-flex justify-content-center'>Email : {u.email}</div>
                                                    <div className='d-flex justify-content-center'>Phone : {u.phone}</div>
                                                    <div className='d-flex justify-content-center'>Role : {u.role===1?"Admin":(u.role===2?"Player":"User")}</div>
                                                </div>
                                                <div className="d-flex flex-column justify-conent-center">
                                                    <div className="ms-1 d-flex flex-row justify-content-center gap-2">
                                                        <button value={u._id} onClick={(e) => { setCurrentUserID(e.target.value);}} className='btn btn-primary ms-2'>EDIT</button>
                                                        <button value={u._id} onClick={(e) => { handleDelete(e) }} className='btn btn-danger ms-2'>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) :
                                        <h5 className='text-center'>No Users to manage</h5>
                                    }
                                </div>
                            </div>
                        </>
                    }
                    {
                        currentUserId&&<UpdateUser uid={currentUserId} stateSetter={stateSetter}/>
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ManageUsers