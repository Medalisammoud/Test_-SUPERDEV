import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import EventsPage from './pages/EventsPage';
import 'antd/dist/reset.css'; // Optional: Import the default Ant Design styles

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#001529', padding: 0 }}>
          <h2 style={{ color: 'white', paddingLeft: 20 }}>Event Management</h2>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <EventsPage />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Event Management ©2025 Created by Your Company
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
