import React,  { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

class SideBar extends Component {


  render () {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>

      </Menu>
    );
  }
}

export default SideBar;
