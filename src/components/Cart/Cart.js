import React from 'react';

const Cart = (props) => {
    const cart = props.cart
    console.log(cart);
    return (
        <div>
            <h1>Cart</h1>
                <h6>Items Order: {cart.length}</h6>
        </div>
    );
};

export default Cart;