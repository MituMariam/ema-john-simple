import React from 'react';
import {useState} from 'react';
import fakeData from '../../fakeData/';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    console.log(fakeData);
    const first10 = fakeData.slice(0,10);
   const [products, setProducts] = useState(first10)
    return (
        <div className="shop_container">
            <div className="product_container">
            <h1>Continue Shopping....</h1>
            
                {
                    products.map(pd => <Product product={pd}></Product>)
                }
                
            </div>
            <div className="cart_container">
                <h1>Cart</h1>
            </div>
            
        </div>
    );
};

export default Shop;