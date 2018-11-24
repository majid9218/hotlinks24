import React from 'react';
import {Link} from 'react-router-dom';

const UserAside = ({id, userName}) => (
    <aside className='col-sm-4'>
        <div className='panel panel-default'>
            <div className='panel-body'>
                <div>
                    <img src={localStorage.pImg || 'https://image.ibb.co/bDjiFU/Default_profile_picture.jpg'} alt={userName} className='img-thumbnail'/>
                    <p>{userName}</p>
                </div>
                <div>
                    <Link to={`/users/${id}/edit`} className='btn btn-custom'>Edit Profile</Link>
                </div>
            </div>
        </div>
    </aside>
);

export default UserAside;