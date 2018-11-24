import React, {Component} from 'react';
import {connect} from 'react-redux';
import HotLinkItem from './hotLinkItem';
import {fetchHotLinks, deleteHotLink, resetHotLinks} from '../stores/acions/hotlink';
import {removeError} from '../stores/acions/error';

class HotLinkList extends Component{
    state = {
        onLoad: true,
        page: 0
    }
    componentWillMount(){
        setTimeout(() => {this.props.fetchHotLinks(this.state.page).then(()=>{
            this.setState(prevState => ({
                onLoad: !prevState.onLoad,
                page: prevState.page + 1
            }));
        });}, 2000);
    }
    componentWillUnmount(){
        this.props.resetHotLinks();
        this.props.removeError();
    }
    loadMore = () => {
        this.setState(prevState => ({
            onLoad: !prevState.onLoad,
            page: prevState.page + 1
        }));
        this.props.fetchHotLinks(this.state.page).then((res)=>{
            this.setState({onLoad: false});
        });
    }
    render(){
        const {hotlinks, currentUser, deleteHotLink, errors} = this.props;
        let hotLinkList = hotlinks.map(link => <HotLinkItem 
                                            key={link._id}
                                            text={link.text}
                                            link={link.link}
                                            title={link.title}
                                            description={link.description}
                                            image={link.image}
                                            date={link.createdAt}
                                            userName={link.user.userName}
                                            profileImageUrl={link.user.profileImageUrl}
                                            deleteHotLink={deleteHotLink.bind(this, link.user._id, link._id)}
                                            isCorrectUser={currentUser === link.user._id}
                                            />
                                        );
        return (
            <div className='row col-sm-8'>
                <div className='offset-1 col-sm-10'>
                    <ul className='list-group'>
                        {hotLinkList}
                    </ul>
                    {this.state.onLoad && <p className='loading'>Loading...</p>}
                    {errors && <p className='loading'>{errors}</p>}
                    {!this.state.onLoad && <button 
                                            className="btn btn-outline-custom"
                                            onClick={this.loadMore}>Load More ...</button>}
                </div>
            </div>
        );
    }
} 

const mapSteteToProps = (state) => ({
    hotlinks: state.hotLinkReducer,
    currentUser: state.currentUser.user.id,
    errors: state.errorReducer.message
});

export default connect(mapSteteToProps, {fetchHotLinks, deleteHotLink, resetHotLinks, removeError})(HotLinkList);