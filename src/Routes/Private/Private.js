import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingAnimation from '../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../Context/UserContext';

const Private = ({ children }) => {
const { user, loading } = useContext(AuthContext)
const location = useLocation()
if (loading) {

    return <LoadingAnimation></LoadingAnimation>

}

if (user && user.uid) {
    return children
}
return <Navigate to='/auht/login' state={{ from: location }} replace></Navigate>

};
export default Private;