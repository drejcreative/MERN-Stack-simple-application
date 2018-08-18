import React from 'react';
import { Layout } from 'antd';
import './Footer.scss';

import config from '../../config/config';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      {config.appName} ©2018 Created by Drej Creative
    </Footer>
  )
}

export { AppFooter };