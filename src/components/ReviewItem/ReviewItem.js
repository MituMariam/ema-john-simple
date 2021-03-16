import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,key,price} = props.product;
    return (
        <div>
            <h3>review item</h3>
            <p>{name}</p>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <button onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;