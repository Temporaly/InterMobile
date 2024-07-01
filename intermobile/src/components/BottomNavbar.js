import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { MdAttachMoney  } from 'react-icons/md'
import { IoSearch } from "react-icons/io5";

const BottomNavbar = () => {
  return (
    <Navbar fixed="bottom" className="justify-content-evenly" style={{backgroundColor: '#095DB7', borderRadius: '10px', padding: '25px'}}>
      <Nav style={{display: 'contents'}}>
        <Nav.Link href="#home"><IoSearch size={55} /></Nav.Link>
        <Nav.Link href="#search"><FaHome size={55} /></Nav.Link>
        <Nav.Link href="#profile"><MdAttachMoney  size={55} /></Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default BottomNavbar;
