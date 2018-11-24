import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HotLinkListTimeLine from './hotLinkListTimeLine';

const Homepage = ({currentUser}) => (
    <div>
        <HotLinkListTimeLine isAuthenticated={currentUser.isAuthenticated} id={currentUser.user.id} userName={currentUser.user.userName} profileImageUrl={currentUser.user.profileImageUrl}/>
    </div>
);

export default Homepage;