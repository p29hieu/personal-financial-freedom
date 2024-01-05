import {
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { MenuComponent } from "./MenuComponent";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigation = useNavigation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          className="overflow-auto h-screen fixed left-0 top-0"
        >
          <MenuComponent />
        </Sider>
        <Layout>
          <Header className="p-0" style={{ background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg w-16 h-16"
            />
            <div style={{ position: "fixed", top: 0, right: 0 }}>
              {navigation.state !== "idle" && (
                <div className="p-2">
                  <LoadingOutlined />
                </div>
              )}
            </div>
          </Header>
          <Content className="mx-4 my-6 p-6 min-h-72">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
