import React, {Component} from 'react';
import {SingleImageUploader} from './singlePageUploader'

class AuthForm extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            userName: '',
            password: '',
            rePassword: '',
            profileImageUrl: '',
            sizeError: ''
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }));
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

    handleSubmit = (e) => {
        e.preventDefault();
        const authType = this.props.signup ? 'signup' : 'signin';
        if(authType === 'signup'){
            if(this.state.password === this.state.rePassword){
                this.props.onAuth(authType, this.state).then(() => {
                    this.props.history.push('/');
                });
            } else{
                this.props.onError({message:'Passwords Not Match!'});
            }
        } else{
            this.props.onAuth(authType, this.state).then(() => {
                this.props.history.push('/');
            });
        }
    }

    render(){
        const {email, userName, password, profileImageUrl} = this.state;
        const {btnText, heading, signup, errors, history, removeError} = this.props;
        history.listen(() => {
            removeError();
        });
        return (
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h1>{heading}</h1>
                            {errors.message && <div className='alert alert-danger'>{errors.message.message}</div>}
                            <label htmlFor='email'>Email:</label>
                            <input className='form-control'
                                   type='text'
                                   id='email' 
                                   name='email' 
                                   value={email} 
                                   onChange={this.handleChange}
                            />
                            <div className='pass'>
                                <label htmlFor='password'>Password:</label>
                                <input className='form-control'
                                    type='password'
                                    id='password' 
                                    name='password' 
                                    onChange={this.handleChange}
                                />
                            </div>
                            {signup && <div>
                                <div className='pass'>
                                    <label htmlFor='rePassword'>Retype-Password:</label>
                                    <input className='form-control'
                                        type='password'
                                        id='rePassword' 
                                        name='rePassword' 
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <label htmlFor='username'>Username:</label>
                                <input className='form-control'
                                    type='text'
                                    id='username' 
                                    name='userName' 
                                    value={userName} 
                                    onChange={this.handleChange}
                                />
                                <label>Image-Upload:</label>
                                <SingleImageUploader sizeError={this.state.sizeError} onFileUpload={this.onFileUpload} />
                            </div>}
                            <button type='submit' className='btn btn-custom btn-block btn-lg'>{btnText}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;