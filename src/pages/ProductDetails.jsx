import React, { useContext } from "react";
// import useParams
import { useParams } from "react-router-dom";
// import cart context
import { CartContext } from "../contexts/CartContext";
// import product context
import { ProductContext } from "../contexts/ProductContext";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  // get id from useParams
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addTocart } = useContext(CartContext);

  // find product
  const product = products.find((product) => {
    return product.id === parseInt(id);
  });

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  // toast
  const notify = () =>
    toast.success(`Product added to cart!`, {
      duration: 3000,
      style: {
        borderRadius: "10px",
        color: "#000",
      },
    });

  const handleAdd = () => {
    addTocart(product, id);
    notify();
  };

  // destructure product
  const { image, title, price, description, category } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        {/* image */}
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-sm"
              src={image}
              alt="product_image"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="uppercase font-normal">{category}</div>
            <h1 className="text-[26px] font-medium mb-2 mx-auto lg:max-0">
              {title}
            </h1>
            <div className="text-xl font-semibold mb-6">${price}</div>
            <p className="mb-8">{description}</p>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg px-6 text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default ProductDetails;
