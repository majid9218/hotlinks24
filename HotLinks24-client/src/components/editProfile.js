import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editUser} from '../stores/acions/auth';
import {SingleImageUploader} from './singlePageUploader';


class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: this.props.user.userName,
            profileImageUrl: this.props.user.profileImageUrl,
            sizeError: ''
        }
    }

    handleUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUser(this.props.user.id, {userName: this.state.userName, profileImageUrl: this.state.profileImageUrl})
        .then((result) => {
            this.props.history.push('/');
        });
    }

    onFileUpload = (e) => {
        if(e.target.files[0].size > 35000){
            this.setState({sizeError: 'Picture must be less than 35 KB!'});
        }
        else{
        var reader= new FileReader();
        reader.onload = (e) => {
                this.setState({profileImageUrl: e.target.result, sizeError: ''});
        };       
        reader.readAsDataURL( e.target.files[0] );  
        }
    }

    onBack = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }

    render(){
        const {errors} = this.props;
        return (
            <div className='row justify-content-md-center text-center'>
                <div className='col-md-6'>
                    <form className='editForm' onSubmit={this.handleSubmit}>
                        {errors.message && <div className='alert alert-danger'>{errors.message.message}</div>}
                        <label htmlFor='username'>Username:</label>
                            <input className='form-control'
                                type='text'
                                id='username' 
                                name='userName' 
                                value={this.state.userName} 
                                onChange={this.handleUserNameChange}
                            />
                        <label>Image-Upload:</label>
                        <SingleImageUploader sizeError={this.state.sizeError} onFileUpload={this.onFileUpload} />
                        <button className='btn btn-custom'>Save</button>
                        <button className='btn btn-custom' onClick={this.onBack}>Back</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.currentUser.user,
    errors: state.errorReducer
});

export default connect(mapStateToProps, {editUser})(EditProfile);