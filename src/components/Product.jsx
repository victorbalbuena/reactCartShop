import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
// cart context
import { CartContext } from "../contexts/CartContext";
// import toast
import toast, { Toaster } from "react-hot-toast";

const Product = ({ product }) => {
  const { addTocart } = useContext(CartContext);
  const { id, image, category, title, price } = product;
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
  return (
    <div>
      <div className="h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <Link to={`/product/${id}`}>
              <img
                className="max-h-[200px] md:group-hover:scale-110 transition-all transform duration-500 ease-in-out cursor-pointer"
                src={image}
                alt="product_image"
              />
            </Link>
          </div>
          <div className="absolute top-52 md:top-40 right-10 md:right-2 md:group-hover:top-56 p-2 flex items-center justify-center gap-y-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-2xl">
            <button onClick={handleAdd}>
              <div className="flex justify-center items-center text-white w-12 h-12 bg-blue-500 rounded-full drop-shadow-xl">
                <BsPlus className="text-3xl" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1 hover:underline">{title}</h2>
        </Link>
        <div className="font-semibold">${price}</div>
      </div>
      <Toaster />
    </div>
  );
};

export default Product;
