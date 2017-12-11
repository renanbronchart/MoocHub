import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

export const Navigation = () => (
  <Menu
    defaultSelectedKeys={['2']}
    mode="inline"
    theme="dark"
  >
    <Menu.Item key='1' className='navigation__logo'>
      <div className="navigation__header">
        <span className='navigation__letter'>M</span>
        <span className='navigation__title'>Mooc-Hub</span>
      </div>
    </Menu.Item>
    <Menu.Item key="2" className='navigation__item'>
      <Link to="/courses">Liste des cours</Link>
    </Menu.Item>
  </Menu>
)
