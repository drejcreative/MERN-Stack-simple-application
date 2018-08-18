import React from 'react';
import { Layout } from 'antd';
import './Header.css';
import config from '../../config/config';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <div className="logo">
        <h2>{config.appName}</h2>
      </div>
    </Header>
  )
}

export { AppHeader };