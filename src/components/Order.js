import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  LeftCircleTwoTone,
  RightCircleTwoTone,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Card, Button, DatePicker, Space, ConfigProvider } from "antd";
import { HotelRoomService } from "../services/hotelroomService";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/uk_UA";
import { userService } from "../services/userService";

const { Meta } = Card;

export default function Order() {
  dayjs.extend(updateLocale);
  dayjs.updateLocale("uk-UA", {
    weekStart: 0,
  });

  const dateNow = new Date(Date.now());
  //console.log(dateNow);
  //   const dateStart = `${dateNow.getFullYear()}/0${
  //     dateNow.getMonth() + 1
  //   }/${dateNow.getDate()}`;
  //   console.log(dateStart);
  //   dateNow.setDate(dateNow.getDate() + 1);

  //   const dateStartNext = `${dateNow.getFullYear()}/0${
  //     dateNow.getMonth() + 1
  //   }/${dateNow.getDate()}`;
  //     console.log(dateStartNext);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const dateStart = formatDate(dateNow);
  const dateStartNext = formatDate(dateNow.setDate(dateNow.getDate() + 1));

  const [hotelRoom, setHotelRoom] = useState([]);
  const [count, setCount] = useState(1);
  const params = useParams();
  const [totalPrice, settotalPrice] = useState(1);

  const { RangePicker } = DatePicker;

  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    loadHotelRoom();
    TotalPrice();
  }, [count, hotelRoom.price]);

  //   const incrementCounter = () => {
  //     setCount(count + 1);
  //     console.log(count);
  //   };

  //   const decrementCounter = () => {
  //     if (count - 1 > 0) setCount(count - 1);
  //     console.log(count);
  //   };

  const TotalPrice = () => {
    settotalPrice(count * hotelRoom.price);
  };

  const loadHotelRoom = async () => {
    if (params.id) {
      //setEditeMode(true);
      const res = await HotelRoomService.get(params.id);
      console.log(params.id);
      console.log(res.data);
      setHotelRoom(res.data);
      //form.setFieldsValue(res.data);
    }
  };

  const onFinish = async () => {
    //values.id = hotelRoom.id;

    //values.ratingNumber = hotelRoom.ratingNumber;

    //const myKey = "hello";
    const myObject = {
      userEmail: userService.getEmailStorage(),
      roomId: hotelRoom.id,
      date: Date.now(),
      totalPrice: totalPrice,
      night: count,
    };

    console.log("Success:", myObject);
    // values.image = values.image.originFileObj;
    //const res = await HotelRoomService.edit(values);
  };

  //   const rangePresets = [
  //     {
  //       label: "Last 7 Days",
  //       value: [dayjs().add(-7, "d"), dayjs()],
  //     },
  //     {
  //       label: "Last 14 Days",
  //       value: [dayjs().add(-14, "d"), dayjs()],
  //     },
  //     {
  //       label: "Last 30 Days",
  //       value: [dayjs().add(-30, "d"), dayjs()],
  //     },
  //     {
  //       label: "Last 90 Days",
  //       value: [dayjs().add(-90, "d"), dayjs()],
  //     },
  //   ];

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      console.log(dates[1] - dates[0]);

      const diffTime = Math.abs(dates[1] - dates[0]);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffTime + " milliseconds");
      console.log(diffDays + " days");

      //   console.log(str);

      setCount(diffDays);
    } else {
      console.log("Clear");
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Order</h2>

      <div style={{ textAlign: "center" }}>
        <Card
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: 350,
          }}
          cover={
            <img
              alt="example"
              src={hotelRoom.imageUrl}
              style={{ maxHeight: 350 }}
            />
          }
          actions={[
            <div>
              <ConfigProvider locale={locale}>
                <Space direction="vertical" size={12}>
                  <RangePicker
                    //presets={rangePresets}
                    onChange={onRangeChange}
                    defaultValue={[
                      dayjs(dateStart, dateFormat),
                      dayjs(dateStartNext, dateFormat),
                    ]}
                    format={dateFormat}
                  />
                </Space>
              </ConfigProvider>
              {/* <LeftCircleTwoTone key="minus" onClick={decrementCounter} />
              <span> {count} </span>
              <RightCircleTwoTone key="plus" onClick={incrementCounter} /> */}
            </div>,
            <div>
              <span>Totaly: </span>
              <span> {totalPrice == "NaN" ? "null" : totalPrice} </span>
            </div>,
            <div>
              <Button
                type="primary"
                htmlType="submit"
                size="small"
                onClick={onFinish}
              >
                Confirm
              </Button>
            </div>,
          ]}
        >
          <Meta
            title={hotelRoom.name}
            description={`Description: ${hotelRoom.description}`}
          />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>Beds: {hotelRoom.numberOfBedsNumber}</div>
            <div>Seats: {hotelRoom.numberOfSeatsNumber}</div>
            <div>Internet: {hotelRoom.hotelRoom ? "Yes" : "No"}</div>
            <div>Bath: {hotelRoom.Bath ? "Yes" : "No"}</div>
          </div>
        </Card>
      </div>
    </>
  );
}
