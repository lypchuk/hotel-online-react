import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const api = process.env.REACT_APP_HOTEL_API + "Hotel";

const onFinish = (values) => {
  console.log("Success:", values);

  //values.image = values.image.originFileObj;
  //
  //   const data = new FormData();
  //   for (const prop in values) {
  //     data.append(prop, values[prop]);
  //   }
  //
  //  console.log(data);
  //  console.log(values);
  //
  //   fetch(api, {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => {
  //       if (res.status == 200) {
  //         alert("Created!");
  //       } else {
  //         alert("Wrong!");
  //       }
  //       return res.json();
  //     })
  //     .then((res) => console.log(res));
  // };

  //axios.post(api, JSON.stringify(values));

  // const addNewUser = async (newUser) => {
  //   try {
  //     const response = await axios.post(api, newUser);
  //     return response.data;
  //   } catch (err) {
  //     console.error(err.toJSON());
  //   }
  // };

  // addNewUser(values);

  console.log(JSON.stringify(values));

  fetch(api, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(values),
  }).then((res) => {
    if (res.status == 200) {
      alert("Created!");
    } else {
      alert("Wrong!");
    }
    console.log(res);
  });
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function CreateHotelRoom() {
  const [TypeRoom, setTypeRoom] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_HOTEL_API + "TypeRoom/all")
      .then((res) => res.json())
      .then((data) => {
        const option = data.map((x) => {
          return { label: x.name, value: x.id };
        });
        setTypeRoom(option);
      });
  }, []);

  const [NumberOfBeds, setNumberOfBeds] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_HOTEL_API + "NumberOfBeds/all")
      .then((res) => res.json())
      .then((data) => {
        const option = data.map((x) => {
          return { label: x.number, value: x.id };
        });
        setNumberOfBeds(option);
      });
  }, []);

  const [NumberOfSeats, setNumberOfSeats] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_HOTEL_API + "NumberOfSeats/all")
      .then((res) => res.json())
      .then((data) => {
        const option = data.map((x) => {
          return { label: x.number, value: x.id };
        });
        setNumberOfSeats(option);
      });
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  return (
    <>
      <Form
        name="basic"
        style={{
          maxWidth: 500,
          margin: "auto",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your hotel room name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your hotel room price!",
            },
          ]}
        >
          <InputNumber suffix="$" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your hotel room description!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item label="Rating number" name="ratingNumber">
          <InputNumber suffix="$" style={{ width: "100%" }} />
        </Form.Item>

        {/* <Form.Item
          label="Type room"
          name="typeRoomId"
          rules={[
            {
              required: true,
              message: "Please input your hotel room type room!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item> */}

        <Select placeholder="Select a Type room" options={TypeRoom} />

        {/* <Form.Item
          label="Number of beds"
          name="numberOfBedsId"
          rules={[
            {
              required: true,
              message: "Please input number of beds in hotel room!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item> */}

        <Select placeholder="Select a number of beds" options={NumberOfBeds} />

        {/* <Form.Item
          label="Number of seats"
          name="numberOfSeatsId"
          rules={[
            {
              required: true,
              message: "Please input number of seats in hotel room!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item> */}

        <Select
          placeholder="Select a number of seats"
          options={NumberOfSeats}
        />

        <Form.Item
          style={{ textAlign: "center" }}
          name="state"
          valuePropName="checked"
        >
          <Checkbox>State</Checkbox>
        </Form.Item>

        <Form.Item
          style={{ textAlign: "center" }}
          name="internet"
          valuePropName="checked"
        >
          <Checkbox>Internet</Checkbox>
        </Form.Item>

        <Form.Item
          style={{ textAlign: "center" }}
          name="bath"
          valuePropName="checked"
        >
          <Checkbox>Bath</Checkbox>
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Image"
          valuePropName="file"
          getValueFromEvent={normFile}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload image</Button>
          </Upload>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
