import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { BsBag } from "react-icons/bs";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  // darkmode
  const [theme, setTheme] = useState("blue");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "blue") {
      document.documentElement.className = "";
      document.documentElement.classList.add("blue");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // header state
  const [isActive, setIsActive] = useState(true);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "py-4 shadow-md" : "py-6"
      } bg-gray-800 fixed w-full z-10 transition-all duration-300 px-5`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div>
            <h2 className="uppercase font-black text-gray-200 text-2xl">
              <span className="text-blue-500 dark:text-purple-500 blue:text-red-600">
                Minima
              </span>
              Store
              <span className="text-sm font-thin bg-purple-700 text-white px-2 rounded-lg">
                beta
              </span>
            </h2>
          </div>
        </Link>
        <div className="flex gap-x-5">
          {/* <div
            onClick={handleThemeSwitch}
            className="cursor-pointer flex relative"
          >
            <FiSettings className="text-2xl text-gray-200" />
          </div> */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <PiShoppingCartSimpleBold className="text-2xl text-gray-200" />
            <div className="bg-blue-500 absolute -right-3 -bottom-1 text-[12px] w-[15px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
