import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { accountsService } from "../services/accountsService";
import { userService } from "../services/userService";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      const res = await accountsService.login(values);
      //console.log(res);
      message.success("Your logged in successfully!");

      //const user = await userService.getUser(values);
      const role = await userService.getRole(values);

      //userService.saveRoleStorage(user.data.role);
      //userService.saveEmailStorage(user.data.email);
      userService.saveRoleStorage(role.data.role);
      userService.saveEmailStorage(values.email);
      console.log(userService.getRoleStorage());
      console.log(userService.getEmailStorage());
      //userService.clearRole();
      //console.log(userService.getRole());

      window.location.reload();

      //window.open("https://google.com");
      //window.location.href("www.google.com");
      //navigate(-1);
    } catch (error) {
      //message.error(error.response.data.message);
    }
  };

  return (
    <>
      <h1 style={center}>Login Form</h1>
      <Form
        name="basic"
        style={{
          maxWidth: 400,
          margin: "auto",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={center}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

const center = {
  textAlign: "center",
};
