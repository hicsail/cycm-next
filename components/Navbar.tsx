import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    {
      name: "About Us",
      href: "about",
    },
    {
      name: "Our Feed",
      href: "feed",
    },
    {
      name: "Contact Us",
      href: "#",
    },
  ];

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (open && !document.querySelector("#navbar-dropdown")?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [open]);

  return (
    <nav className="fixed bg-white border-gray-200 top-0 w-full z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <h1 className="font-bold text-4xl">CYCM</h1>
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            {!mobileOpen ? (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            ) : (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            )}
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${!mobileOpen && "hidden"}`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium mt-4 md:items-center md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block py-4 px-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <div className="relative inline-block text-left w-full">
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-4 px-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                  >
                    Resources
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                </div>
                {open && (
                  <div
                    id="dropdownNavbar"
                    className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                        item 0
                      </a>
                    </div>
                    <div className="py-1" role="none">
                      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                        item 1
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li>
              <button
                type="button"
                className="w-full text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-3 text-center"
              >
                Learn
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
