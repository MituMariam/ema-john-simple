import React from 'react';
import { Link } from 'react-router-dom';
import  "./Cart.css";

const Cart = (props) => {
    const cart = props.cart
    // const {name} = props.cart
    console.log(cart);
    const total = cart.reduce((total,prd)=> total + prd.price, 0)


    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }


    const tax = Math.round(total / 10);
    // const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping +  Number(tax)).toFixed(2)

    return (
        <div>
            <h1>Cart</h1>
                <h6>Items Order: {cart.length}</h6>
                <h6>Shipping Cost: {shipping}</h6>
                <h6>Product Price: {total}</h6>
                <h6>tax: {tax}</h6>
                <h6>Total Price: {grandTotal}</h6>
              
                <Link to="/review">   <button>Review Order</button> </Link>
                
        </div>
    );
};

export default Cart;