import React, { useState, useEffect } from 'react';
import { Menu, Icon, Badge } from 'antd';
import './Navbar.css';

function NavBar() {
  
  const Left = () => {
    return (
    <Menu>
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
    </Menu>
    )
  }

  const Right = () => {
  
    const [count, setCount] = useState(0);

    useEffect(() => {
      if(localStorage.getItem("info")){
        setCount(JSON.parse(localStorage.getItem("info")).length);
      } else {
        setCount(0);
      } 
    }, [])

    return (
      <Menu>
        <Menu.Item key="cart" style={{ marginTop: 20 }}>
            <a href="/cart" style={{color:'#667777'}}>
            <Badge count={count} showZero style={{marginRight: 10, marginTop: 8}}>
              <Icon type="shopping-cart" style={{ fontSize: 33 }} />
            </Badge>
            </a>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <nav className="menu">
      <div className="menu__logo">
        <a href="/"><img src={require('../../logo.png')} alt="Logo"/></a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <Left/>
        </div>
        <div className="menu_right">
          <Right/>
        </div>
      </div>
    </nav>
  )
}

export default NavBar