import React from 'react';
import {useState} from 'react';
import fakeData from '../../fakeData/';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    console.log(fakeData);
    const first10 = fakeData.slice(0,10);
   const [products, setProducts] = useState(first10)
   const [cart, setCart] = useState([])
   
   const handleAddProduct = (product) =>{
       console.log('product added',product);
       const newCart =[...cart,product]
       setCart(newCart)
   }
    return (
        <div className="shop_container">
            <div className="product_container">
            <h1>Continue Shopping....</h1>
            
                {
                    products.map(pd => <Product
                        handleAddProduct={handleAddProduct} 
                        product={pd}
                        ></Product>)
                }
                
            </div>
            <div className="cart_container">
             <Cart cart={cart}></Cart>
                
            </div>
            
        </div>
    );
};

export default Shop;