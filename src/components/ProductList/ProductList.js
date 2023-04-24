import React from "react";
import "./ProductList.scss";
import Product from "../Product/Product";

function ProductList({ products }) {
  return (
    <div className="product-lists grid bg-whitesmoke my-3">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
