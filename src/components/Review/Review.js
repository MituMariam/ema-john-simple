import React from 'react';
import {useState, useEffect} from 'react';
import fakeData from '../../fakeData';
import {getDatabaseCart, processOrder} from '../../utilities/databaseManager'
import {removeFromDatabaseCart} from '../../utilities/databaseManager'
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setorderPlaced] = useState(false)
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product;
        });
        setCart(cartProducts);
        // console.log(productKeys);
    }, [])


    const removeProduct = (productKey) => {
        console.log('remove clicked')
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
       removeFromDatabaseCart(productKey);
    };

    const handlePlaceorder = () =>{
      setCart([]);
      setorderPlaced(true)
      processOrder();
    }
    let thanku;
    if(orderPlaced){
        thanku =  <img src={happyImage} alt=""/>
    }
    return (
        <div className="shop_container">
            <div className="product_container">
            <h3>review</h3>
            <h4>Cart Items: {cart.length}</h4>
            {cart.map(pd=>  <ReviewItem key={pd.key} product={pd} removeProduct ={removeProduct}></ReviewItem>)}
               {thanku}
            </div>
            <div className="cart_container">
                
             <Cart cart={cart}>
            
                     <button onClick={handlePlaceorder}>Place order</button>
                 
             </Cart>
                
            </div>
            
        </div>
    
    );
};

export default Review;