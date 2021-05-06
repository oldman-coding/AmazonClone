import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SigninScreen() {
    const [email,setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO: Signin Action
    }
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Sign in</h1>
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
                    <button className='primary' type='submit'>Sign in</button>
                </div>
                <div>
                    <label>
                        <div>
                            New customer? <Link to='/register'>Create your account</Link>
                        </div>
                    </label>
                </div>
            </form>
            
        </div>
    )
}
