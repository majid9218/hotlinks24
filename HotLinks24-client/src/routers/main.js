import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Homepage from '../components/homepage';
import AuthForm from '../components/authform';
import {authUser} from '../stores/acions/auth';
import {removeError, onError} from '../stores/acions/error';
import withAuth from '../hocs/withAuth';
import NewHotLinkForm from '../components/newHotLinkForm';
import EditProfile from '../components/editProfile';

const Main = (props) => {
    const {authUser, errors, removeError, currentUser, onError} = props;
    return (
        <div className='container'>
            <Switch>
                <Route exact path='/' render={(props) => <Homepage currentUser={currentUser} {...props}/>} />
                <Route path='/signin' 
                    render={(props) => <AuthForm onAuth={authUser}
                                        removeError={removeError}
                                        errors={errors}
                                        btnText='Log In' 
                                        heading='Welcome Back!' 
                                        {...props}/>} 
                />
                <Route path='/signup' 
                    render={(props) => <AuthForm onAuth={authUser} 
                                        onError={onError}
                                        removeError={removeError}
                                        errors={errors} 
                                        signup btnText='Sign Up' 
                                        heading='Join Us Now!' 
                                        {...props}/>} 
                />
                <Route 
                    path='/users/:id/hotlinks/new' 
                    component={withAuth(NewHotLinkForm)} 
                />
                <Route 
                    path='/users/:id/edit' 
                    component={withAuth(EditProfile)} 
                />
            </Switch>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    errors: state.errorReducer
});

export default withRouter(connect(mapStateToProps, {authUser, onError, removeError})(Main));