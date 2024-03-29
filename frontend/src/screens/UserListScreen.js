import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
    const userList = useSelector(state => state.userList); 
    const { loading, error, users } = userList; 
    const userDelete = useSelector(state => state.userDelete); 
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete; 

    const deleteHandler = (userId) => {
        if (window.confirm('Are you sure to delete')) {
            dispatch(deleteUser(userId)); 
        }
    }
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(listUsers()); 
    }, [dispatch, successDelete]);

    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant='success'>Successful Delete</MessageBox>}
            {loading ? ( <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                
                <table className="table">
                    
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS SELLER</th>
                            <th>IS ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isSeller? "YES" : "NO"}</td>
                            <td>{user.isAdmin? "YES" : "NO"}</td>
                            <td>
                                
                                <button
                                    type="button"
                                    className="small"
                                    onClick={() =>
                                    props.history.push(`/user/${user._id}/edit`)
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="small"
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
