import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Space, ConfigProvider } from "antd";
import { HotelRoomService } from "../services/hotelroomService";
const { Meta } = Card;

export default function Show() {
  const [hotelRoom, setHotelRoom] = useState([]);
  const params = useParams();

  useEffect(() => {
    loadHotelRoom();
  }, []);

  const loadHotelRoom = async () => {
    if (params.id) {
      const res = await HotelRoomService.get(params.id);
      console.log(params.id);
      console.log(res.data);
      setHotelRoom(res.data);
      //form.setFieldsValue(res.data);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Show room info</h2>

      <div style={{ textAlign: "center" }}>
        <Card
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: 350,
            maxHeight: 500,
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
              {hotelRoom.state ? (
                <Link to={`../order/${hotelRoom.id}`}>
                  <Button type="primary" htmlType="submit" size="small">
                    Make an order!
                  </Button>
                </Link>
              ) : (
                <Button type="primary" htmlType="submit" size="small" disabled>
                  Sorry for the inconvenience
                </Button>
              )}
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
