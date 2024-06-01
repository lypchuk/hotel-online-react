import React from "react";
import { Button, DatePicker, Form, Input, message, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { accountsService } from "../services/accountsService";
import { userService } from "../services/userService";

export default function Register() {
  const navigate = useNavigate();

  const role = userService.getRoleStorage();
  console.log(role);
  const onFinish = async (values) => {
    console.log("Success:", values);

    if (userService.getRoleStorage() == null) values.role = "user";

    if (values.roleCheckbox) values.role = "admin";

    const res = await accountsService.register(values);

    if (res.status !== 200) {
      message.console.error("Something went wrong!");
      return;
    }

    message.success("Your registered in successfully!");
    navigate(-1);
  };

  return (
    <>
      <h1 style={center}>{role == "admin" ? "Create" : "Register"} Form</h1>
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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Birthdate"
          name="birthdate"
          rules={[
            {
              required: true,
              message: "Please enter your birthdate!",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: false,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {role == "admin" ? (
          <Form.Item
            name="roleCheckbox"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Admin ?</Checkbox>
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item style={center}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

const center = {
  textAlign: "center",
};
