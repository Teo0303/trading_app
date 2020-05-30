import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { withFirebase } from "../../services/fb";

const { Header, Content, Footer } = Layout;

const DefaultLayout: React.FC<any> = ({ children, firebase }) => {
  let history = useHistory();

  const onSignOut = () => {
    firebase.doSignOut().then(() => history.push("/login"));
  };
  return (
    <Layout className='default-layout'>
      <Header>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["2"]}>
          <Menu.Item key='1'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='2' onClick={onSignOut}>
            Log Out
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default withFirebase(DefaultLayout);
