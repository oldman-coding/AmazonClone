import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const [email, setEmail] = useState(''); 
    const [name, setName] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
                        ? props.location.search.split('=')[1]
                        : '/'

    const userRegister = useSelector(state => state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password not match')
        }
        else {
            dispatch(register(name, email, password));
        }
        
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor='Name'>Name</label>
                    <input 
                        type='text' 
                        id='name' 
                        placeholder='Enter Name'
                        required 
                        onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='email'>Email address</label>
                    <input 
                        type='email' 
                        id='email' 
                        placeholder='Enter Email'
                        required 
                        onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        placeholder='Enter Password'
                        required 
                        onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        type='password' 
                        id='confirmPassword' 
                        placeholder='Enter Confirm Password'
                        required 
                        onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                
                <div>
                    <label />
                    <button className='primary' type='submit'>Register</button>
                </div>
                <div>
                    <label>
                        <div>
                            Already have an account <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                        </div>
                    </label>
                </div>
            </form>
            
        </div>
    )
}
