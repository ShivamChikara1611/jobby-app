import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Updated import
import Cookies from "js-cookie";
import { ImHome } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";

const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png';

const Header = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login'); // Use navigate instead of history.replace
  };

  return (
    <nav className="nav-container">
      <ul className="header-ul-container">
        <li className="logo-container">
          <Link className="link" to="/">
            <img className="logo" src={websiteLogo} alt="website logo" />
          </Link>
        </li>
        <li className="home-jobs-container">
          <Link className="link" to="/">
            <ImHome className="home-icon" />
            <h1 className="nav-text">Home</h1>
          </Link>
          <Link className="link" to="/jobs">
            <h1 className="nav-text">Jobs</h1>
            <button className="home-jobs-btn">Jobs</button>
          </Link>
        </li>
        <li>
          <FiLogOut className="home-icon" onClick={onClickLogout} />
          <button type="button" className="btn-logout" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
