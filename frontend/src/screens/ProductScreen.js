import React, { useEffect, useState } from 'react'; 
import {useSelector, useDispatch} from 'react-redux';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const [qty , setQty] = useState(1);
    const productId = props.match.params.productId;
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails;
    
    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>{loading? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
            <div>
            <Link to="/">Back to result</Link>
            <div className='row top'>
                <div className='col-2'>
                    <img className='large' src={product.image} alt={product.name} />
                </div>
                <div className='col-1'>
                    <ul>
                        <li><h1>{product.name}</h1></li>
                        <li>
                            <Rating 
                                rating={product.rating}
                                numReviews ={product.numReviews} />
                        </li>
                        <li>Price: ${product.price}</li>
                        <li>
                            Description: 
                            <p>{product.description}</p>
                        </li>
                    </ul>

                </div>
                
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                Seller { ' '}
                                <h2>
                                    <Link to={`/seller/${product.seller._id}`}>
                                        {product.seller.seller.name}
                                    </Link>
                                </h2>
                                <Rating rating = {product.seller.seller.rating}
                                        numReviews = {product.seller.seller.numReviews}></Rating>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Price</div>
                                    <div className='price'>${product.price}</div>
                                </div>
                            </li>

                            <li>
                                <div className='row'>
                                    <div>Status: </div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className='sucess'> In Stock</span>
                                        ) : (<span className='error'> Unavaiable</span>)}
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className='row'>
                                                <div>Qty</div>
                                                <div>
                                                    <select value={qty} onChange={
                                                        e => setQty(e.target.value)
                                                    }>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(
                                                                x => (
                                                                    <option key ={x+1} value={x+1}>
                                                                        {x+1}
                                                                    </option>
                                                                )
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick ={addToCartHandler} className='primary block'>Add to cart</button>
                                        </li>
                                    </>
                                )
                            }

                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )}
        </div>


    )
}
