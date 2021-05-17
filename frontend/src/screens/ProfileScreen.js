import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { detailUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin); 
    const {userInfo} = userSignin; 

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const userDetail = useSelector(state => state.userDetail); 
    const { loading, error, user } = userDetail; 
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;
  
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password not match')
        } else {
            dispatch(updateUserProfile({userId: user._id, name, email, password}))
        }
    }
    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailUser(userInfo._id));
        }
        else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, user, userInfo._id])
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <> 
                    {loadingUpdate && <LoadingBox />}
                    {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox variant='success'>Update Profile Succesfully</MessageBox>}
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='name' 
                            id='name' 
                            placeholder='Enter Name'
                            value = {name}
                            onChange={e => setName(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor='email'>Email address</label>
                        <input 
                            type='email' 
                            id='email' 
                            placeholder='Enter Email'
                            value = {email}
                            onChange={e => setEmail(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            id='password' 
                            placeholder='Enter Password'
                            onChange={e => setPassword(e.target.value)}

                            ></input>
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input 
                            type='password' 
                            id='confirmPassword' 
                            placeholder='Enter Confirm Password'
                            onChange={e => setConfirmPassword(e.target.value)}

                            ></input>
                    </div>
                    <div>
                        <button className='primary' type='submit'>Update</button>
                    </div>
                </>
                

            </form>
        </div>
    )
}
