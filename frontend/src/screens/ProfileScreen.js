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
    const [ sellerName, setSellerName ] = useState(''); 
    const [ sellerLogo, setSellerLogo ] = useState(''); 
    const [ sellerDescription, setSellerDescription ] = useState(''); 

    const userDetail = useSelector(state => state.userDetail); 
    const { loading, error, user } = userDetail; 
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;
  
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password not match')
        } else {
            dispatch(updateUserProfile({userId: user._id, name, email, password, sellerName, sellerLogo, sellerDescription}))
        }
    }
    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailUser(userInfo._id));
        }
        else {
            if (user.seller) {
                setSellerName(user.seller.name); 
                setSellerLogo(user.seller.logo); 
                setSellerDescription(user.seller.description); 
            }
            setName(user.name);
            setEmail(user.email);
        }
        console.log(user);
    }, [dispatch, user, userInfo])
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
                    {user.isSeller && (
                        <>
                            <h2>Seller</h2>
                            <div>
                                <label htmlFor='sellerName'>Seller Name</label>
                                <input 
                                    id='sellerName' 
                                    type='text'
                                    value={sellerName} 
                                    onChange={e => setSellerName(e.target.value)}
                                    />
                            </div>
                            <div>
                                <label htmlFor='sellerLogo'>Seller Logo</label>
                                <input 
                                    id='sellerLogo' 
                                    type='text'
                                    value={sellerLogo} 
                                    onChange={e => setSellerLogo(e.target.value)}
                                    />
                            </div>
                            <div>
                                <label htmlFor='sellerDescription'>Seller Description</label>
                                <input 
                                    id='sellerDescription' 
                                    type='text'
                                    value={sellerDescription} 
                                    onChange={e => setSellerDescription(e.target.value)}
                                    />
                            </div>
                        </>
                    )}
                    <div>
                        <button className='primary' type='submit'>Update</button>
                    </div>
                </>
                

            </form>
        </div>
    )
}
