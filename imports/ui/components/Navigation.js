import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

export const Navigation = () => (
  <Menu
    defaultSelectedKeys={['1']}
    mode="inline"
    theme="dark"
    className='navigation'
  >
    <Menu.Item key="1">
      <Link to="/">Accueil</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/courses">Liste des cours</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="inbox" />
      <span>Option 3</span>
    </Menu.Item>
  </Menu>
)
