import { React, useEffect, useState, useRef } from "react";

import { Layout, Menu, Space, message } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  RightCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userService } from "../services/userService";
import { accountsService } from "../services/accountsService";
const { Header: AntHeader } = Layout;

// const items = [
//   {
//     key: "Home",
//     label: <Link to="/">Home</Link>,
//     icon: <HomeOutlined />,
//   },
//   {
//     key: "AboutUs",
//     label: <Link to="aboutus">About Us</Link>,
//     icon: <FaInfo />,
//   },
// {
//   key: "For Admin",
//   label: <Link to="foradminlist">For Admin</Link>,
//   icon: <UserOutlined />,
// },
// ];

export default function Header() {
  const email = userService.getEmailStorage();
  const role = userService.getRoleStorage();

  const getItem = () => {
    if (role != "admin") {
      return [
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
      ];
    } else {
      return [
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
    }
  };
  /*
  var isAuth = true;

  {
    email != null ? (isAuth = true) : (isAuth = false);
  }
*/
  // useEffect(() => {
  //   if (userService.getRole() != null) {
  //     items.push({
  //       key: "Out",
  //       label: <Link to="/">Out</Link>,
  //       icon: <HomeOutlined />,
  //     });
  //   }
  // }, [userService.getRole()]);

  const onLogout = async () => {
    const res = await accountsService.logout();

    if (res && res.status === 200) {
      message.success(`Your have logged out successfully!`);
    }

    // ----- working with state
    // logout();
    //dispatch(logout());
    userService.clearEmailStorage();
    userService.clearRoleStorage();
    window.location.reload();
  };

  const Checkrole = () => {
    if (role == "user") {
      return (
        <Space>
          <span style={{ color: "white" }}>Hello, {email}</span>
          <span
            onClick={onLogout}
            style={{ color: "white", cursor: "pointer" }}
          >
            <LogoutOutlined />
          </span>
        </Space>
      );
    } else if (role == "admin") {
      return (
        <Space>
          <span style={{ color: "white" }}>Hello, {email}</span>
          <Link to="Register" style={{ color: "white" }}>
            <Space size="small">
              <RightCircleOutlined />
              <span>Create user</span>
            </Space>
          </Link>
          <span
            onClick={onLogout}
            style={{ color: "white", cursor: "pointer" }}
          >
            <LogoutOutlined />
          </span>
        </Space>
      );
    } else {
      return (
        <Space size="large">
          <Link to="Register" style={{ color: "white" }}>
            <Space size="small">
              <RightCircleOutlined />
              <span>Register</span>
            </Space>
          </Link>
          <Link to="login" style={{ color: "white" }}>
            <Space size="small">
              <LoginOutlined />
              <span>Login</span>
            </Space>
          </Link>
        </Space>
      );
    }
  };

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
        items={getItem(role)}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
      {Checkrole()}
    </AntHeader>
  );
}

// {
//   key: "Login",
//   label: <Link to="login">Login</Link>,
//   icon: <LoginOutlined />,
// },
// {
//   key: "Register",
//   label: <Link to="Register">Register</Link>,
//   icon: <RightCircleOutlined />,
// },
