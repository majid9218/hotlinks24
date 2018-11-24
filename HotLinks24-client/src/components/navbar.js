import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from '../stores/acions/auth';

class Navbar extends Component{
    logOut = (e) => {
        this.props.logOut();
        window.location.assign('/');
    }
    render(){
        return (
            <nav className='navbar navbar-expand fixed-top'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            <img alt='Logo' src='https://image.ibb.co/jO3eN9/hotlinks24.jpg'/>
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (<ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to={`/users/${this.props.currentUser.user.id}/hotlinks/new`}>New Link</Link>
                            </li>
                            <li>
                                <a onClick={this.logOut}>Log Out</a>
                            </li>
                        </ul>) : (<ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to='/signin'>Sign In</Link>
                            </li>
                            <li>
                                <Link to='/signup'>Sign Up</Link>
                            </li>
                        </ul>)
                    }
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, {logOut})(Navbar);