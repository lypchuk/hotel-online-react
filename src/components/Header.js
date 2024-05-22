import React from "react";

import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
const { Header: AntHeader } = Layout;

const items = [
  {
    key: "Home",
    label: <Link to="/">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "AboutUs",
    label: <Link to="aboutus">About Us</Link>,
    icon: <FaInfo />,
  },
  {
    key: "For Admin",
    label: <Link to="foradminlist">For Admin</Link>,
    icon: <UserOutlined />,
  },
];

export default function Header() {
  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
    </AntHeader>
  );
}
