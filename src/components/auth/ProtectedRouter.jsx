import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, navigate } from 'react-router-dom'
import Loader from '../layout/Loader'

function ProtectedRouter({children}) {
const {isAuthenticated,loading}=useSelector((state)=>state.auth)
if(loading) return <Loader/>

if(!isAuthenticated){
    return <Navigate to="/login" replace/>
}


  return (children)
}

export default ProtectedRouter
