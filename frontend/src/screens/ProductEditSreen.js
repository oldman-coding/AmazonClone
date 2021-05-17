import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, editProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_EDIT_RESET } from '../constants/productConstants';

export default function ProductEditSreen(props) {
    const productId = props.match.params.productId;
    const [name, setName] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [image, setImage] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [countInStock, setCountInStock] = useState(''); 
    const [brand, setBrand] = useState(''); 
    const [description, setDescription] = useState(''); 

    const dispatch = useDispatch(); 
    const productDetails = useSelector(state => state.productDetails); 
    const { loading, error, product } = productDetails;

    const productEdit = useSelector(state => state.productEdit); 
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productEdit;

    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist'); 
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({type: PRODUCT_EDIT_RESET}); 
            dispatch(detailsProduct(productId)); 
        } else {
            setName(product.name); 
            setPrice(product.price); 
            setImage(product.image); 
            setCategory(product.category); 
            setCountInStock(product.countInStock); 
            setBrand(product.brand); 
            setDescription(product.description); 
        }; 
      
    }, [dispatch, product, productId, props.history, successUpdate]); 

    const submitHandler = (e) => {
        e.preventdefault(); 
        dispatch(editProduct({_id: productId, name, price, image, 
            category, countInStock, brand, description })); 
    }
    const [loadingUpload, setLoadingUpload] = useState(false); 
    const [errorUpload, setErrorUpload] = useState(false); 
    const userSignin = useSelector(state => state.userSignin); 
    const {userInfo} = userSignin;

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]; 
        const bodyFormData = new FormData(); 
        bodyFormData.append('image', file); 
        setLoadingUpload(true); 
        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: {'Content-Type': 'multipart/form-data', 
                        Authorization: `Bearer ${userInfo.token}`}
            }); 
            setImage(data); 
            setLoadingUpload(false); 
        } catch (error) {
            setErrorUpload(error.message); 
            setLoadingUpload(false); 
        }
    }; 

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox />}
                {errorUpdate && <MessageBox>{errorUpdate}</MessageBox>}
                {loading? <LoadingBox />
                : error ? <MessageBox>{error}</MessageBox> 
                : 
                <>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            id='name' 
                            placeholder='Enter Name'
                            value = {name}
                            onChange={e => setName(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor='price'>Price</label>
                        <input 
                            type='text' 
                            id='price' 
                            placeholder='Enter Price'
                            value = {price}
                            onChange={e => setPrice(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor='image'>Image</label>
                        <input 
                            type='text' 
                            id='image' 
                            placeholder='Enter Image'
                            value = {image}
                            onChange={e => setImage(e.target.value)}
                            ></input>
                        {loadingUpload && <LoadingBox />}
                        {errorUpload && <MessageBox variant='danger'>{errorUpload}</MessageBox>}
                    </div>
                    <div>
                        <label htmlFor='imageFile'>Image File</label>
                        <input 
                            type='file' id='imageFile'
                            label='Choose Image'
                            onChange={uploadFileHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='category'>Category</label>
                        <input 
                            type='text' 
                            id='category' 
                            placeholder='Enter Category'
                            value = {category}
                            onChange={e => setCategory(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor='countInStock'>Count in Stock</label>
                        <input 
                            type='text' 
                            id='countInStock' 
                            placeholder='Count in Stock'
                            value = {countInStock}
                            onChange={e => setCountInStock(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor='brand'>Brand</label>
                        <input 
                            type='text' 
                            id='brand' 
                            placeholder='Enter Brand'
                            value = {brand}
                            onChange={e => setBrand(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea 
                            type='text' 
                            id='description' 
                            rows= '3'
                            placeholder='Enter Description'
                            value = {description}
                            onChange={e => setDescription(e.target.value)}
                            ></textarea>
                    </div>
                    <div>
                        <button className='primary' type='submit'>Update</button>
                    </div>
                </>    

                }
            </form>
        </div>
    )
}
