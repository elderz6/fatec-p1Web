import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import * as Cookies from "js-cookie";

export const setSessionCookie = (session) => {
    Cookies.remove("session");
    Cookies.set("session", session, { expires: 14 });
  };
  
export const getSessionCookie = () => {
    const sessionCookie = Cookies.get("session");
    if (sessionCookie === undefined) {
        let teste = {"auth":false,"role":'Cliente' }
        return teste;
    } else {
      return  JSON.parse(sessionCookie);
    }
};
const cookie = getSessionCookie();

const initialState = {
    auth: cookie.auth,
    role: cookie.role
}

export const AuthApi = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    //Actions
    const doAuth = (login) => {
        setSessionCookie(login)
        dispatch({
            type:'AUTHENTICATE',
            payload: login
        });   
    }

    return(
    <AuthApi.Provider value={{
        auth:state.auth,
        role:state.role,
        doAuth
    }}>
        {children}
    </AuthApi.Provider>
    );
}