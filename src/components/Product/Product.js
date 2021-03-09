import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = (props) => {
    console.log(props);
    const {img, seller, name, price,stock, key} = props.product
    return (
        <div className="product_cart">
            <div className="thumbnail">
                <img src={img} alt=""/>
                </div> 
                <div className="data_info">
                    <h4><Link to={"/product/" + key}>{name} </Link><br/>
                    <small>by: {seller}</small></h4>
                    <p>${price}</p>
                    <p>Only {stock} left in stock - order soon</p>
                    {props.showAddToCart &&  <button onClick = {() =>props.handleAddProduct(props.product)}>add to cart</button>}
               
                </div> 
            
        </div>
    );
};

export default Product;