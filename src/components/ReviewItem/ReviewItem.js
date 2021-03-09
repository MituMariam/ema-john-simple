import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity} = props.product;
    return (
        <div>
            <h3>review item</h3>
            <p>{name}</p>
            <p>Quantity: {quantity}</p>
            <button>Remove</button>
        </div>
    );
};

export default ReviewItem;