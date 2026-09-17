import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, Avatar, Descriptions } from 'antd';
import { LogoutOutlined, BankOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = ({ user, onLogout }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529', padding: '0 24px' }}>
        <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          <BankOutlined style={{ marginRight: 8 }} /> KIT's IMER - MCA Department
        </div>
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={onLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: '30px 50px', background: '#f0f2f5' }}>
        <Card style={{ marginBottom: 24, borderRadius: 8 }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            </Col>
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Welcome, {user?.firstName} {user?.lastName}!
              </Title>
              <Paragraph type="secondary" style={{ margin: 0 }}>
                Logged in as: {user?.email}
              </Paragraph>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Card title="About Kolhapur Institute of Technology's IMER" buffered={false}>
              <Paragraph>
                Kolhapur Institute of Technology’s Institute of Management Education and Research (Autonomous) is a premier institute committed to delivering high-quality education in computer applications and management studies.
              </Paragraph>
              <Title level={4}>Department of Master of Computer Applications (MCA)</Title>
              <Paragraph>
                The MCA department focuses on nurturing full-stack developers, software engineers, and data professionals through a modern, industry-aligned curriculum covering software development life cycles, cloud engineering, and modern web architectures.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Quick Highlights" buffered={false}>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Program">MCA (2 Years Autonomous)</Descriptions.Item>
                <Descriptions.Item label="Focus Areas">Full-Stack Development, DevOps, Big Data</Descriptions.Item>
                <Descriptions.Item label="Status">Autonomous Institute</Descriptions.Item>
                <Descriptions.Item label="Location">Kolhapur, Maharashtra</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Kolhapur Institute of Technology's IMER ©2026 MCA Department
      </Footer>
    </Layout>
  );
};

export default LandingPage;