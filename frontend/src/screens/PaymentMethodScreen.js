import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();
    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder'); 
    }; 
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>  
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>  
                </div>
                <div>
                    <div>
                        <input type='radio' id='paypal' 
                        value = 'PayPal' name='paymentMethod'
                        required checked onChange={e => setPaymentMethod(e.target.value)} />
                        <lablel htmlFor='paypal'>PayPal</lablel>
                    </div>
                </div>
                <div>
                    <div>
                        <input type='radio' id='stripe' 
                        value = 'Stripe' name='paymentMethod'
                        required onChange={e => setPaymentMethod(e.target.value)} />
                        <lablel htmlFor='stripe'>Stripe</lablel>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>
    )
}