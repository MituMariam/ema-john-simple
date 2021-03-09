import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams()
    const product = fakeData.find(pd => pd.key === productkey)
    console.log(product);
    return (
        <div>
            {productkey} product detail
            <Product product={product}  showAddToCart = {false}></Product>
        </div>
    );
};

export default ProductDetail;