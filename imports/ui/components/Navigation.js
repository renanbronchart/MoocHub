import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import { Logout } from './Logout.js';

export const Navigation = () => (
  <Menu
    mode="inline"
    theme="dark"
    defaultSelectedKeys={['1']}
  >
    <Menu.Item key='1' className='navigation__logo'>
      <div className="navigation__header">
        <Link to="/">
          <span className='navigation__letter'>M</span>
          <span className='navigation__title text--white'>Mooc-Hub</span>
        </Link>
      </div>
    </Menu.Item>
    {
      Meteor.userId() ?
      <Menu.Item key="2" className='navigation__item'>
        <Link to="/courses">Liste des cours</Link>
      </Menu.Item> : ''
    }
    {
      Meteor.userId() ?
      <Menu.Item key="3" className='navigation__item'>
        <Link to="/courses/add">Ajouter un cours</Link>
      </Menu.Item>
      : ''
    }
    {
      Meteor.userId() ?
      <Menu.Item key="4" className='navigation__item'>
        <Logout />
      </Menu.Item>
      : ''
    }
  </Menu>
)
