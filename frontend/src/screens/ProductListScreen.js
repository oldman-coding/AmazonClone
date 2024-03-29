import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
    const sellerMode = props.match.path.indexOf('/seller') >=0;
    const productList = useSelector(state => state.productList); 
    const { loading, error, products} = productList; 
    const productCreate = useSelector(state => state.productCreate); 
    const { loading: loadingCreate, product: createdProduct, success: successCreate, error: errorCreate} = productCreate; 

    const productDelete = useSelector(state => state.productDelete); 
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete; 
    const userSignin = useSelector(state => state.userSignin); 
    const {userInfo} = userSignin; 
    
    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure to delete')) {
            dispatch(deleteProduct(productId));
        }; 
    }

    const createHandler = () => {
        dispatch(createProduct());
    }
    const dispatch = useDispatch(); 
    useEffect(() => {
        if (successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET}); 
            props.history.push(`/product/${createdProduct._id}/edit`); 
        } else {
            dispatch({type: PRODUCT_CREATE_REQUEST});
        }
        if (successDelete) {
            dispatch({type: PRODUCT_DELETE_RESET})
        }

        dispatch(listProducts({ seller: sellerMode? userInfo._id : ''}));
    }, [dispatch, createdProduct, props.history, successCreate, successDelete, sellerMode, userInfo._id])

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                        <button
                            type="button"
                            className="small"
                            onClick={() =>
                            props.history.push(`/product/${product._id}/edit`)
                            }
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="small"
                            onClick={() => deleteHandler(product._id)}
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
        );
}
