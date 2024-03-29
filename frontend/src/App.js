import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminRoute from './components/AdminRoute';
import SellerRoute from './components/SellerRoute'; 
import { BrowserRouter, Link, Route } from 'react-router-dom'; 
import { signout } from './actions/userAction';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAdressScreen from './screens/ShippingAdressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditSreen from './screens/ProductEditSreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerScreen from './screens/SellerScreen';

function App() {
    const cart = useSelector(state => state.cart);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const {cartItems} = cart;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }
  return (
    <BrowserRouter>
        <div className='grid-container'>
            <header className='row'>
                <div>
                    <Link to='/' className='brand' >AmazonC</Link>
                </div>
                <div>
                    <Link to='/cart'>Cart
                        {cartItems.length > 0 && (
                            <span className='badge'>{cartItems.length}</span>
                        )}
                    </Link>
                    {
                        userInfo ? (
                            <div className='dropdown'>
                                <Link to='#'>
                                    {userInfo.name} <i className='fa fa-caret-down'></i>
                                </Link>
                                <ul className='dropdown-content'>
                                    <li>
                                        <Link to='/profile'>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/orderhistory'>
                                            Order history
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='#signout' onClick={signoutHandler}>
                                            Sign out
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        ) 
                        : (<Link to='/signin'>Sign In</Link>)
                    }
                    {userInfo && userInfo.isSeller
                    && (
                        <div className='dropdown'>
                            <Link to='#seller'>
                                Seller <i className='fa fa-caret-down'></i>
                            </Link>
                            <ul className='dropdown-content'>
                                <li>
                                    <Link to='/productlist/seller'>Products</Link>
                                </li>
                                <li>
                                    <Link to='orderlist/seller'>Orders</Link>
                                </li>
                            </ul>
                        </div>  
                    )
                    }
                    {userInfo && userInfo.isAdmin && (
                        <div className='dropdown'>
                            <Link to='#admin'>
                                Admin <i className='fa fa-caret-down'></i>
                            </Link>
                            <ul className='dropdown-content'>
                                <li>
                                    <Link to='/dashboard'>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to='/productlist'>Products</Link>
                                </li>
                                <li>
                                    <Link to='/orderlist'>Orders</Link>
                                </li>
                                <li>
                                    <Link to='/userlist'>Users</Link>
                                </li>

                            </ul>
                        </div>
                    )}
                    
                </div>
            </header>
            <main>
                <Route path='/seller/:id' component={SellerScreen}></Route>
                <Route path='/cart/:id?' component = {CartScreen} />
                <Route path='/signin' component = {SigninScreen} />
                <Route path='/register' component = {RegisterScreen} />
                <Route path='/shipping' component = {ShippingAdressScreen} />
                <Route path='/payment' component = {PaymentMethodScreen} />
                <Route path='/placeorder' component = {PlaceOrderScreen} />
                <Route exact path ='/product/:productId' component= {ProductScreen} />
                <Route path ='/product/:productId/edit' component= {ProductEditSreen} />
                <Route path = '/order/:id' component = {OrderScreen} />
                <Route path= '/orderhistory' component = {OrderHistoryScreen} />
                <PrivateRoute path ='/profile' component = {ProfileScreen } />
                <AdminRoute exact path ='/productlist' component = {ProductListScreen} />
                <AdminRoute exact path = '/orderlist' component = {OrderListScreen} />
                <SellerRoute path ='orderlist/seller' component = {OrderListScreen} />
                <SellerRoute path ='/productlist/seller' component = {ProductListScreen} />
                <AdminRoute path = '/userlist' component = {UserListScreen} />
                <AdminRoute path ='/user/:id/edit' component={ UserEditScreen } />
                <Route exact path ='/' component = {HomeScreen} />
            </main>
            <footer className="row center">
                All right reserved
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
