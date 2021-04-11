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
let cookie = getSessionCookie();

const initialState = {
    auth: cookie.auth,
    role: cookie.role,
    nome: cookie.nome,
    email: cookie.email
}

export const AuthApi = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    //Actions
    const doAuth = (login) => {
        dispatch({
            type:'AUTHENTICATE',
            payload: login
        });   
        setSessionCookie(login);
    }
    const doLogout = () => {
        dispatch({
            type:'LOGOUT',
            payload:''
        });
        setSessionCookie({});
    }

    return(
    <AuthApi.Provider value={{
        auth:state.auth,
        role:state.role,
        nome: state.nome,
        email: state.email,
        doAuth,
        doLogout
    }}>
        {children}
    </AuthApi.Provider>
    );
}