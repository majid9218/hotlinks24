import React from 'react';
import HotLinkList from './hotLinkList';
import UserAside from './userAside';

const HotLinkListTimeLine = ({isAuthenticated, id, userName, profileImageUrl}) => (
    <div className='row'>
        {isAuthenticated ? <UserAside id={id} userName={userName} profileImageUrl={profileImageUrl}/> : <div className='col-sm-2'></div>}
        <HotLinkList />
    </div>
);

export default HotLinkListTimeLine;

