import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12">
      <Link to={"/"}>
        <div className="text-center mb-3">
          <h2 className="uppercase font-black text-gray-200 text-xl">
            <span className="text-blue-500">Minima</span>Store
          </h2>
        </div>
      </Link>
      <div className="container mx-auto">
        <p className="text-white text-center">
          &copy; 2023, Minimastore.com, inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;
