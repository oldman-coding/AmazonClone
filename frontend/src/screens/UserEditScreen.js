import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailUser, updateUser } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAIL_RESET, USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id; 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const userUpdate = useSelector(state => state.userUpdate); 
    const {loading, error, success} = userUpdate; 
    
    const userDetail = useSelector(state => state.userDetail);
    const {loading: loadingDetail, error: errorDetail, user} = userDetail;
    const dispatch = useDispatch(); 
    
    
    const submitHandler = (e) => {
        e.preventDefault(); 
        dispatch(updateUser({userId, name, email, isSeller, isAdmin})); 
    }
    
    useEffect(() => {
        if (success) {
            dispatch({type: USER_UPDATE_RESET}); 
            props.history.push('/userlist'); 
            dispatch({type: USER_DETAIL_RESET})
        }

        if (!user) {
            
            dispatch(detailUser(userId)); 
        } else {
            setName(user.name); 
            setEmail(user.email); 
            setIsSeller(user.isSeller); 
            setIsAdmin(user.isAdmin); 
        }; 
    }, [dispatch, props.history, success, user, userId]); 
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit User</h1>
                </div>
                {loading? (<LoadingBox />)
                : error? (<MessageBox variant='danger'>{error}</MessageBox>)
                : (
                    <>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input id='name' type = 'text'
                            placeholder="Enter Name"
                            value={name}
                            onChange={e => setName(e.target.value)}>
                            
                            </input>
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input id='email' type = 'text'
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}>
                            
                            </input>
                        </div>
                        <div>
                            <input type='checkbox' id='isSeller' 
                            checked = {isSeller} 
                            onChange={e => setIsSeller(e.target.checked)} />
                            <label htmlFor='isSeller'>Is Seller</label>
                        </div>
                        <div>
                            <input type='checkbox' id='isAdmin' 
                            checked = {isAdmin}
                            onChange={e => setIsAdmin(e.target.checked)} />
                            <label htmlFor='isSeller'>Is Admin</label>
                        </div>
                        <div>
                            <button className='primary' type='submit'>Update</button>
                         </div>
                    </>
                )}
            </form>
        </div>
    )
}
