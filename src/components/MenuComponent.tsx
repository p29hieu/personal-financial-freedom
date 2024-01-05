import {
  BarChartOutlined,
  CalculatorOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../constants";

export const MenuComponent = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: (
            <Link to={PAGES_ROUTES.Home}>
              <HomeOutlined />
            </Link>
          ),
          label: "Home",
        },
        {
          key: "2",
          icon: (
            <Link to={PAGES_ROUTES.Calculate}>
              <CalculatorOutlined />
            </Link>
          ),
          label: "Calculate",
        },
        {
          key: "3",
          icon: (
            <Link to={PAGES_ROUTES.Synthesize}>
              <BarChartOutlined />
            </Link>
          ),
          label: "Synthesize",
        },
      ]}
    />
  );
};
