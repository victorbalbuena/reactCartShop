import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import ReactPaginate from "react-paginate";

const Home = () => {
  // get productos del context
  const { products } = useContext(ProductContext);

  //   get category
  const filteredProducts = products.filter((product) => {
    return (
      product.category === "men's clothing" ||
      product.category === "women's clothing" ||
      product.category === "jewelery"
    );
  });

  console.log(filteredProducts);

  // paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemsOffset, setItemsOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemsOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemsOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemsOffset, itemsPerPage, filteredProducts.length > 1]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setItemsOffset(selectedPage * itemsPerPage);
  };

  return (
    <>
      <div>
        <section className="pt-24 pb-12 mx-3">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {currentItems.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          </div>
        </section>
      </div>
      {/* <div>
        {currentItems.map((title) => {
          return <Product key={title.id} title={title} />;
        })}
      </div> */}
      <div className="flex justify-center pb-10">
        <ReactPaginate
          breakLabel={"..."}
          nextLabel={">"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={"<"}
          marginPagesDisplayed={null}
          containerClassName="flex gap-x-4 text-gray-700 justify-center font-semibold rounded-md text-lg"
          pageLinkClassName="px-3 text-lg hover:text-blue-600 transition"
          previousLinkClassName="text-gray-700 px-3 text-xl hover:text-blue-600 transition"
          nextLinkClassName="text-gray-700 px-3 text-xl hover:text-blue-600 transition"
          activeClassName="text-blue-500"
        />
      </div>
    </>
  );
};

export default Home;
