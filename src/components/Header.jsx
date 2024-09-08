import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";
import { assets } from "../assets/assets";

const websiteLogo = "https://assets.ccbp.in/frontend/react-js/logo-img.png";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 text-gray-300">
      <Link to="/">
        <img className="w-[120px]" src={websiteLogo} alt="website logo" />
      </Link>

      <ul className="hidden md:flex justify-between font-medium">
      <li className="flex items-center gap-5 text-xs">
          <Link to="/">
            <button className="px-5 py-1 rounded-md border border-2 border-gray-500 hover:bg-blue-800 hover:border-transparent transition-all duration-300 hover:scale-105">
              Home
            </button>
          </Link>
          <Link to="/jobs">
            <button className="px-5 py-1 rounded-md border border-2 border-gray-500 hover:bg-blue-800 hover:border-transparent transition-all duration-300 hover:scale-105">
              Jobs
            </button>
          </Link>
        </li>
      </ul>

      <ul className="hidden md:flex justify-between font-medium">
        <li className="flex items-center gap-2 text-xs">
          <FiLogOut className="home-icon" onClick={onClickLogout} />
          <button
            type="button"
            className="px-5 py-1 rounded-md border border-2 border-gray-500 hover:bg-blue-800 hover:border-transparent transition-all duration-300 hover:scale-105"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      

      {/*--------Mobile Menu-----------*/}

      <div
        className={`${
          showMenu ? "fixed w-full" : "h-0 w-0"
        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-black transition-all text-blue-500`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-[120px] cursor-pointer" src={websiteLogo} alt="" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p className="px-[30px] py-2 rounded-full inline-block">Home</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/jobs">
            <p className="px-[30px] py-2 rounded-full inline-block">Jobs</p>
          </NavLink>
        </ul>
      </div>

      {/*Menu Icon*/}

      <img
        onClick={() => setShowMenu(true)}
        className="w-5 md:hidden cursor-pointer"
        src={assets.menu_icon}
        alt=""
      />

    </nav>
  );
};

export default Header;
