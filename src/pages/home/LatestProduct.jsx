import { use } from "react";
import ProductCard from "./ProductCard";

const LatestProduct = ({latestProductPromise}) => {
    const products = use(latestProductPromise)
    return (
        <div className="mt-12 w-11/12 mx-auto">
            <h1 className="font-bold text-4xl text-center">Recent <span className="text-primary">Products</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {
                    products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default LatestProduct;