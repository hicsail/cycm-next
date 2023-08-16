import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {

  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setColor('black');
        setTextColor('white');
      } else {
        setColor('transparent');
        setTextColor('black');
      }
    }
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    }
  }, []);

  return (
    <div style={{
      backgroundColor: color,
    }} className="fixed left-0 top-0 w-full z-10 ease-in duration-300">
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4">
        <Link href="/">
          <h1 className="font-bold text-4xl">CYCM</h1>
        </Link>
        <ul className="hidden sm:flex">
          <li className="p-4">
            <Link href="/#about">Mission</Link>
          </li>
          <li className="p-4">
            <Link href="/studies">Studies</Link>
          </li>
          <li className="p-4">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div className="block sm:hidden z-10">
          {
            nav ? (
              <AiOutlineClose className="text-4xl" onClick={handleNav} />
            ) : (
              <AiOutlineMenu className="text-4xl" onClick={handleNav} />
            )
          }
        </div>
        {/* Mobile Menu */ }
        <div className={nav ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
        : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"}>
          <ul>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/#about">Mission</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/contact">Contact</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/mission">Mission</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
