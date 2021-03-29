import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthApi from './AuthApi';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

const RouteRegistration = ({ component: Component, ...rest }) => {
    const authApi = React.useContext(AuthApi);
    return(
    <Route {...rest} render={props => (
        !authApi.auth
            ? (<Component {...props} />)
            : (<Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />)
    )} />
)}

const PrivateRoute = ({ component: Component, ...rest }) =>{
    const authApi = React.useContext(AuthApi);
    return(
    <Route {...rest} render={props => (
        authApi.auth
            ? (<Component {...props} />)
            : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    )} />
);}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <RouteRegistration exact path='/' component={() => <Login />} />
            <RouteRegistration exact path='/signup' component={() => <Login />} />
            <PrivateRoute exact path='/dashboard' component={() => <Dashboard />} />
            <PrivateRoute path='/chamados' component={() => <h2>Logado</h2>} />
        </Switch>
    </BrowserRouter>
);


export default Routes;