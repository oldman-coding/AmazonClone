import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
    const [email,setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const redirect = props.location.search
                        ? props.location.search.split('=')[1]
                        : '/'
    
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
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
                    <h1>Sign in</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
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
                    <button className='primary' type='submit'>Sign in</button>
                </div>
                <div>
                    <label>
                        <div>
                            New customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                        </div>
                    </label>
                </div>
            </form>
            
        </div>
    )
}
