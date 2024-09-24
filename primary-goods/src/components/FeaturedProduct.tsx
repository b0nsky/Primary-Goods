import React from 'react';
import ProductSlider from '@/components/ProductSlider';

interface Product {
    id: number;
    name: string;
    price: number | string;
    thumbnail: string;
}

interface FeaturedProductProps {
    products: Product[];
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ products }) => {

    return (
        <div className="overflow-hidden">
            <ProductSlider products={products} />
        </div>
    );
};


export default FeaturedProduct;
