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
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { HotelRoomService } from "../services/hotelroomService";

const api = process.env.REACT_APP_HOTEL_API + "HotelRoom";

export default function HotelRoomForm() {
  const [TypeRoom, setTypeRoom] = useState([]);
  const [NumberOfBeds, setNumberOfBeds] = useState([]);
  const [NumberOfSeats, setNumberOfSeats] = useState([]);

  const [editMode, setEditeMode] = useState(false);

  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (editMode) {
      console.log("Success:", values);
      // values.image = values.image.originFileObj;
      const res = await HotelRoomService.edit(values);
      console.log(res);
      if (res.status == 200) {
        message.success("Update");
        navigate(-1);
      } else {
        message.alert("Wrong");
      }
    } else {
      console.log("Success:", values);
      // values.image = values.image.originFileObj;
      const res = await HotelRoomService.create(values);
      console.log(res);
      if (res.status == 200) {
        message.success("Created");
        navigate(-1);
      } else {
        message.alert("Wrong");
      }
    }

    // const data = new FormData();
    // for (const prop in values) {
    //   data.append(prop, values[prop]);
    // }
    // console.log(data);
    // console.log(values);

    // fetch(api, {
    //   method: "POST",
    //   body: data,
    // })
    //   .then((res) => {
    //     if (res.status == 200) {
    //       alert("Created!");
    //       navigate(-1);
    //     } else {
    //       alert("Wrong!");
    //     }
    //     // return res.json();
    //   })
    //   .then((res) => console.log(res));
  };

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

  //   console.log(JSON.stringify(values));

  //   fetch(api, {
  //     method: "POST",
  //     mode: "no-cors",
  //     body: JSON.stringify(values),
  //   }).then((res) => {
  //     if (res.status == 200) {
  //       alert("Created!");
  //     } else {
  //       alert("Wrong!");
  //     }
  //     console.log(res);
  //   });
  // };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    loadHotelRoom();

    getAllTypeRoom();

    getAllNumberOfBeds();

    getAllNumberOfSeats();

    // fetch(process.env.REACT_APP_HOTEL_API + "HotelRoom/typeroom")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const option = data.map((x) => {
    //       return { label: x.name, value: x.id };
    //     });
    //     setTypeRoom(option);
    //   });
  }, []);

  const loadHotelRoom = async () => {
    if (params.id) {
      setEditeMode(true);
      const res = await HotelRoomService.get(params.id);
      console.log(params.id);
      console.log(res.data);
      form.setFieldValue(res.data);
    }
  };

  const getAllNumberOfSeats = async () => {
    var response = await HotelRoomService.getNumberOfSeats();
    // console.log(response);
    const option = response.data.map((x) => {
      return { label: x.number, value: x.id };
    });
    setNumberOfSeats(option);
  };

  const getAllNumberOfBeds = async () => {
    var response = await HotelRoomService.getNumberOfBeds();
    // console.log(response);
    const option = response.data.map((x) => {
      return { label: x.number, value: x.id };
    });
    setNumberOfBeds(option);
  };

  async function getAllTypeRoom() {
    var response = await HotelRoomService.getTypeRoom();
    // console.log(response);
    const option = response.data.map((x) => {
      return { label: x.name, value: x.id };
    });
    setTypeRoom(option);
  }

  // useEffect(() => {
  //   async function getAllNumberOfBeds() {
  //     var response = await HotelRoomService.getNumberOfBeds();
  //     console.log(response);
  //     const option = response.data.map((x) => {
  //       return { label: x.number, value: x.id };
  //     });
  //     setNumberOfBeds(option);
  //   }

  //   getAllNumberOfBeds();
  //   // fetch(process.env.REACT_APP_HOTEL_API + "HotelRoom/numberofbeds")
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     const option = data.map((x) => {
  //   //       return { label: x.number, value: x.id };
  //   //     });
  //   //     setNumberOfBeds(option);
  //   //   });
  // }, []);

  // useEffect(() => {
  //   async function getAllNumberOfSeats() {
  //     var response = await HotelRoomService.getNumberOfSeats();
  //     console.log(response);
  //     const option = response.data.map((x) => {
  //       return { label: x.number, value: x.id };
  //     });
  //     setNumberOfSeats(option);
  //   }
  //   getAllNumberOfSeats();
  //   // fetch(process.env.REACT_APP_HOTEL_API + "HotelRoom/numberofseats")
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     const option = data.map((x) => {
  //   //       return { label: x.number, value: x.id };
  //   //     });
  //   //     setNumberOfSeats(option);
  //   //   });
  // }, []);

  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.file.originFileObj;
  // };

  return (
    <>
      <Button
        icon={<ArrowLeftOutlined />}
        type="text"
        onClick={() => navigate(-1)}
      ></Button>

      <h2 style={{ textAlign: "center" }}>
        {editMode ? "Edit" : "Create"} form
      </h2>

      <Form
        name="basic"
        form={form}
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
          initialValue={"no description"}
          rules={[
            {
              required: true,
              message: "Please input your hotel room description!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        {/* <Form.Item label="Rating number" name="ratingNumber">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item> */}

        <Form.Item
          label="Type room"
          name="typeRoomId"
          rules={[
            {
              required: true,
              message: "Please input your hotel room type room!",
            },
          ]}
        >
          {/* <InputNumber style={{ width: "100%" }} /> */}
          <Select
            placeholder="Select a type hotel room"
            options={TypeRoom}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Number of beds"
          name="numberOfBedsId"
          rules={[
            {
              required: true,
              message: "Please input number of beds in hotel room!",
            },
          ]}
        >
          {/* <InputNumber style={{ width: "100%" }} /> */}
          <Select
            placeholder="Select a number of beds"
            options={NumberOfBeds}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Number of seats"
          name="numberOfSeatsId"
          rules={[
            {
              required: true,
              message: "Please input number of seats in hotel room!",
            },
          ]}
        >
          {/* <InputNumber style={{ width: "100%" }} /> */}
          <Select
            placeholder="Select a number of seats"
            options={NumberOfSeats}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item name="state" valuePropName="checked" initialValue={false}>
          <Checkbox>State</Checkbox>
        </Form.Item>

        <Form.Item
          initialValue={false}
          // style={{ textAlign: "center" }}
          name="internet"
          valuePropName="checked"
        >
          <Checkbox>Internet</Checkbox>
        </Form.Item>

        <Form.Item
          // style={{ textAlign: "center" }}
          name="bath"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Bath</Checkbox>
        </Form.Item>

        {/* <Form.Item
          name="imageUrl"
          label="Image"
          valuePropName="file"
          getValueFromEvent={normFile}
          rules={[
            {
              required: editeMode ? false : true,
              message: "Please select hotel room image!",
            },
          ]}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload image</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item
          label="Image URL"
          name="imageUrl"
          initialValue={"no image"}
          rules={[
            {
              required: true,
              message: "Please input your hotel room imageUrl!",
            },
          ]}
        >
          <Input />
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
