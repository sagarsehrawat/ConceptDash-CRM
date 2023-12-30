import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthState = (props) => {
    const initialState = localStorage.getItem('privileges')===null ? [] : JSON.parse(localStorage.getItem('privileges'))
    const [privileges, setPrivileges] = useState(initialState)

    return <AuthContext.Provider value={{privileges, setPrivileges}}>{props.children}</AuthContext.Provider>
    
}

export default AuthState;