import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import LandingPage from './LandingPage';
import './App.css';

const { Title, Text } = Typography;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [user, setUser] = useState(null);

  // Handle Form Submission
  const onFinish = async (values) => {
    setLoading(true);
    const isLogin = activeTab === '1';
    const url = isLogin ? 'http://localhost:5000/api/signin' : 'http://localhost:5000/api/signup';

    try {
      const res = await axios.post(url, values);
      message.success(res.data.message || "Operation Successful!");

      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
      } else {
        setActiveTab('1'); // Switch to login tab after successful signup
      }
    } catch (err) {
      message.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    message.info("Logged out successfully");
  };

  if (user) {
    return <LandingPage user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card className="auth-card" style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Title level={2}>KIT's IMER</Title>
          <Text type="secondary">MCA Department Auth System</Text>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab} 
          centered
          items={[
            { label: 'Sign In', key: '1' },
            { label: 'Sign Up', key: '2' },
          ]}
        />

        <Form name="auth_form" onFinish={onFinish} layout="vertical">
          {activeTab === '2' && (
            <>
              <Form.Item name="firstName" rules={[{ required: true, message: 'Please input First Name!' }]}>
                <Input prefix={<UserOutlined />} placeholder="First Name" size="large" />
              </Form.Item>
              <Form.Item name="lastName" rules={[{ required: true, message: 'Please input Last Name!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Last Name" size="large" />
              </Form.Item>
            </>
          )}

          <Form.Item 
            name="email" 
            rules={[
              { required: true, message: 'Please input an Email!' },
              { type: 'email', message: 'The input is not a valid E-mail!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email Address" size="large" />
          </Form.Item>

          <Form.Item 
            name="password" 
            rules={[
              { required: true, message: 'Please input Password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
              { 
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])/, 
                message: 'Must include at least one number and one special character (!@#$%^&*)' 
              }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              {activeTab === '1' ? 'Login' : 'Register'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default App;
