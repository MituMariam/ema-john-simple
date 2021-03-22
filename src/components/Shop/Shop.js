import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData/';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0,10);
   const [products, setProducts] = useState(first10)
   const [cart, setCart] = useState([])

   useEffect(() => {
      const savedcart = getDatabaseCart();
      const productKeys = Object.keys(savedcart);
      const previousCart = productKeys.map(existingKey =>{
          const product = fakeData.find(pd => pd.key === existingKey);
          product.quantity = savedcart[existingKey];
          return product;
      })
      setCart(previousCart)
   }, [])
   
   const handleAddProduct = (product) =>{
    //    console.log('product added',product);
    const toBeAddedKey = product.key;
       const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
       let count = 1;
       let newCart;
       if(sameProduct){
           const count = sameProduct.quantity + 1;
           sameProduct.quantity = sameProduct.quantity + 1;
           const others = cart.filter(pd => pd.key !== toBeAddedKey);
           newCart = [...others, sameProduct]
       }else{
        product.quantity =1;
        newCart =[...cart,product];
       }   
       setCart(newCart);
       addToDatabaseCart(product.key, count)
    //    const count = sameProduct.length;
   }
    return (
        <div className="shop_container">
            <div className="product_container">
            <h1>Continue Shopping....</h1>
            
                {
                    products.map(pd => <Product
                    key = {pd.key}
                    showAddToCart = {true}
                        handleAddProduct={handleAddProduct} 
                        product={pd}
                        ></Product>)
                }
                
            </div>
            <div className="cart_container">
             <Cart cart={cart}>
                 <Link to="/review">
                     <button>review order</button>
                 </Link>
             </Cart>
                
            </div>
            
        </div>
    );
};

export default Shop;