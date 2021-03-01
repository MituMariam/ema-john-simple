import React from 'react';
import './Product.css'

const Product = (props) => {
    // console.log(props.product.name);
    const {img, seller, name, price,stock} = props.product
    return (
        <div className="product_cart">
            <div className="thumbnail">
                <img src={img}/>
                </div> 
                <div className="data_info">
                    <h4>{name} <br/>
                    <small>by: {seller}</small></h4>
                    <p>${price}</p>
                    <p>Only {stock} left in stock - order soon</p>
                <button onClick = {() =>props.handleAddProduct(props.product)}>add to cart</button>
                </div> 
            
        </div>
    );
};

export default Product;