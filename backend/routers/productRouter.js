import express from 'express'; 
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import {isAuth, isAdmin, isSellerOrAdmin} from '../ultils.js'; 

const productRouter = express.Router(); 

productRouter.get('/', expressAsyncHandler(async(req, res) => {
    const seller = req.query.seller || ''; 
    const sellerFilter = seller? {seller}: {}; 
    const products = await Product.find({...sellerFilter}).populate('seller', 'seller.name seller.logo'); 
    res.send(products); 
}))

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    // await Product.remove({})
    const createdProducts = await Product.insertMany(data.products);
    res.send( createdProducts )
}))

productRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 
                    'seller.name seller.logo seller.rating seller.numReviews'); 
    if (product) {
              res.send(product);
            }else {
              res.status(404).send({message: 'Product not found'})
            }
})); 

productRouter.post('/', isAuth, isSellerOrAdmin, 
expressAsyncHandler(async(req, res) => {
  const product = new Product({
    name: 'sample name', 
    seller: req.user._id, 
    image: '/images/p1.jpg', 
    price: 0,
    category: 'sample category', 
    brand: 'sample brand', 
    countInStock: 0, 
    rating: 0, 
    numReviews: 0, 
    description: 'sample description'
  }); 
  const createdProduct = await product.save(); 
  res.send({message: 'Product Created', product: createdProduct })
})); 

productRouter.put('/:id', isAuth, isSellerOrAdmin, 
expressAsyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id); 
    if (product) {
      product.name = req.body.name ; 
      product.price = req.body.price ; 
      product.image = req.body.image ; 
      product.category = req.body.category ; 
      product.countInStock = req.body.countInStock ; 
      product.brand = req.body.brand ; 
      product.description = req.body.description ; 
      const updatedProduct = await product.save();
      res.send({message: 'Product Updated', product: updatedProduct});
    } else {
      res.status(404).send({message: 'Product not found'}); 
    }
  }
)); 

productRouter.delete('/:id', isAuth, isAdmin, 
expressAsyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id); 
  if (product) {
    const deletedProduct = await product.remove(); 
    res.send({message: 'Product Deleted', product: deletedProduct})
  } else {
    res.status(404).send({message: 'Product not Found'});
  }
})); 

export default productRouter;

