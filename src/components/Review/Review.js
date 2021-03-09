import React from 'react';
import {useState, useEffect} from 'react';
import fakeData from '../../fakeData';
import {getDatabaseCart} from '../../utilities/databaseManager'
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {

    const [cart, setCart] = useState([])
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product;
        });
        setCart(cartProducts);
        console.log(productKeys);
    })
    return (
        <div>
            <h3>review</h3>
            <h4>Cart Items: {cart.length}</h4>
            {cart.map(pd=>  <ReviewItem product={pd}></ReviewItem>)}
          
        </div>
    );
};

export default Review;