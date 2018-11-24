import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

const HotLinkItem = ({text, link, title, description, image, date, userName, profileImageUrl, isCorrectUser, deleteHotLink}) => (
    <div>
        <li className='list-group-item'>
            <div className='linkTop'>
                <div className='linkHeader'>
                    <img src={profileImageUrl || 'https://image.ibb.co/bDjiFU/Default_profile_picture.jpg'} alt={userName} width='75' height='75'/>
                    <div>
                        <Link to='/'>@{userName} &nbsp;</Link>
                        <br/>
                        <span className='text-muted'>
                            <Moment className='text-muted' format='ddd, h:mm a'>
                                {date}
                            </Moment>
                        </span>
                    </div>
                </div>
                {isCorrectUser && <p className='delete-btn' onClick={deleteHotLink}>Delete</p>}
            </div>
            <div className='message-area'>
                <p>{text}</p>
                <a target="_blank" rel="noopener noreferrer" className='linkContainer' href={link}>
                    <div>
                        <img src={image} alt='image' width='100' height='100'/>
                        <h3>{title}</h3>
                    </div>
                    <p>{description.substring(0,80)}...</p>
                </a>
            </div>
        </li>
    </div>
);

export default HotLinkItem;