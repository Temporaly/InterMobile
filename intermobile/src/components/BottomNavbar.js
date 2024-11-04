import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext.js';

const BottomNavbar = () => {
  const { theme } = useTheme();

  return (
    <Navbar id="Nav" fixed="bottom" className="justify-content-evenly" style={{ backgroundColor: theme.mainColor, borderRadius: '10px', padding: '25px' }}>
      <Nav style={{ display: 'contents' }}>
        <Link to="/Search"><IoSearch size={55} /></Link>
        <Link to="/Home"><FaHome size={55} /></Link>
        <Link to="/Shop"><MdAttachMoney size={55} /></Link>
      </Nav>
    </Navbar>
  );
};

export default BottomNavbar;
