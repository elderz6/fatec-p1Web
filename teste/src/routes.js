import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {AuthApi} from './AuthApi';
import Cadastro from './Components/Cadastro';
import CadastroAnalista from './Components/CadastroAnalista';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import ChamadoForm from './Components/ChamadoForm';

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
    )} /> );
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { auth, role } = React.useContext(AuthApi);
    return(
        <Route {...rest} render={props => (
            (auth && role === 'Gestor')
                ? (<Component {...props} />)
                : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        )} /> );
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <RouteRegistration exact path='/' component={() => <Login />} />
            <RouteRegistration exact path='/login' component={() => <Login />} />
            <RouteRegistration exact path='/cadastro' component={() => <Cadastro />} />
            <PrivateRoute exact path='/dashboard' component={() => <Dashboard />} />
            <PrivateRoute exact path='/novoChamado' component={() => <ChamadoForm />} />
            <ProtectedRoute exact path='/cadastrarAnalista' component={() => <CadastroAnalista />} />
            <Redirect from="*" to="/"/>
        </Switch>
    </BrowserRouter>
);


export default Routes;