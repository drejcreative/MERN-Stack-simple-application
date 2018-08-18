import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import './Main.css';

import { Layout } from 'antd';
import { AppHeader, AppFooter, AppList } from '../components/index';

const { Content } = Layout;

const Main = () => (
  <Fragment>
    <AppHeader />
    <Content>
    <div className="main">
     <AppList />
    </div>
    </Content>
    <AppFooter />
  </Fragment>
)

export { Main };