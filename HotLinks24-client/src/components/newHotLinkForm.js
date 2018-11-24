import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNewHotLink} from '../stores/acions/hotlink';

class NewHotLinkForm extends Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            link: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addNewHotLink(this.state.text, this.state.link);
        this.setState({text:'', link:''});
        this.props.history.push('/');
    }
    render(){
        return (
            <form className='newForm' onSubmit={this.handleSubmit}>
                {this.props.errors.message && (<div className='alert alert-danger'>{this.props.errors.message}</div>)}
                <input 
                    type='text'
                    value={this.state.text}
                    onChange={e => {
                        const text = e.target.value;
                        this.setState({text: text});
                    }}
                    className='new form-control' 
                    maxLength = '120'
                />
                <input 
                    type='url'
                    value={this.state.link}
                    onChange={e => {
                        const link = e.target.value;
                        this.setState({link: link});
                    }}
                    className='new form-control' 
                />
                <button type='submit' className='btn btn-custom pull-right'>Add New Link!</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.errorReducer
});

export default connect(mapStateToProps, {addNewHotLink})(NewHotLinkForm);

