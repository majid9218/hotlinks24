import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function(ComponentToWrap){
    class AuthComponent extends Component{
        componentWillMount(){
            if(this.props.isAuthonticated === false){
                this.props.history.push('/signin');
            }
        }
        componentWillUpdate(nextProps){
            if(nextProps.isAuthonticated === false){
                nextProps.history.push('signin');
            }
        }
        render(){
            return (
                <ComponentToWrap {...this.props} />
            );
        }
    }

    const mapStateToProps = (state) => ({
        isAuthonticated: state.currentUser.isAuthonticated
    });

    return connect(mapStateToProps)(AuthComponent);
}