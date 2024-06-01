import { React, useEffect, useState, useRef } from "react";
import { Card, List, Button, Carousel, Form, Select } from "antd";
import { HotelRoomService } from "../services/hotelroomService";
import { Link } from "react-router-dom";
import { Button as BootBtn } from "react-bootstrap";

export default function Home() {
  //const [count, setCount] = useState(0);
  const [HotelRooms, setHotelRooms] = useState([]);
  const [TypeRoom, setTypeRoom] = useState([]);
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    //background: "#364d79",
  };

  const contentStyleImg = {
    width: "25%",
    marginLeft: "37%",
    // mar: "50%",
    borderRadius: "10px",
  };

  const CarouselStyle = {
    margin: 10,
    display: "flex",
    justifyContent: "between",
  };

  // const increment = () => {
  //   setCount(count + 1);
  //   console.log(count);
  // };

  useEffect(() => {
    loadHotelRoom();
    getAllTypeRoom();
    //sourceDataMy(HotelRooms);
  }, []);

  async function getAllTypeRoom() {
    const response = await HotelRoomService.getTypeRoom();
    const option = response.data.map((x) => {
      return { label: x.name, value: x.id };
    });
    option.push({ label: "All", value: 0 });
    setTypeRoom(option);
  }

  const loadHotelRoom = async () => {
    const res = await HotelRoomService.getAll();
    // const data = await res.json();
    setHotelRooms(res.data);
  };

  const onChange = (HotelRooms) => {
    console.log(HotelRooms);
  };

  const handleChange = async (value) => {
    if (value != 0) {
      const res = await HotelRoomService.getAll();
      const filter = res.data.filter((x) => x.typeRoomId == value);
      console.log(`selected ${value}`);
      console.log(`selected ${filter}`);
      setHotelRooms(filter);
    } else {
      loadHotelRoom();
    }
  };

  const sourceDataMy = (HotelRooms) => {
    //console.log("HotelRooms");
    //console.log(HotelRooms);
    var options = ``;

    options = `<Carousel 
        id="result"
        afterChange={onChange}
        autoplay
        style={{ margin: 10 }}
      >
      `;
    for (const i of HotelRooms) {
      options += `<div>
      <img style={contentStyleImg} src="${i.imageUrl}"></img>
      </div>
      `;
    }

    options += `</Carousel>`;
    console.log(options);
    document.getElementById("result").innerHTML = options;
    // var p = document.getElementById("result");
    // var list = document.createElement("div");

    // var str = ``;
    // for (const i of HotelRooms) {
    //   str += `
    //   <div>
    //       <h3 style={contentStyle}>${i.name}</h3>
    //     </div>
    //   `;
    // }
    // console.log(str);

    // const textarea = document.createElement("textarea");
    // textarea.value = p.innerText;

    // list.innerHTML = str;
    // p.replaceWith(textarea);
    //document.getElementById("result") = list;
  };

  return (
    <>
      {/* <div>Home page</div>;
      <div>
        <span className={count > 10 ? "red" : ""}>Counter: {count}</span>
        <button onClick={increment}>+</button>
      </div> */}

      <Form.Item
        label="Filter"
        name="typeRoomId"
        rules={[
          {
            message: "Please select hotel room type room!",
          },
        ]}
      >
        {/* <InputNumber style={{ width: "100%" }} /> */}
        <Select
          onChange={handleChange}
          placeholder="Select a type hotel room"
          options={TypeRoom}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Carousel
        id="result"
        afterChange={onChange}
        autoplay
        style={CarouselStyle}
      >
        <div>
          <img
            style={contentStyleImg}
            src="https://cf.bstatic.com/xdata/images/hotel/square240/248195922.webp?k=6b877e663516a32f2bc8ea0650bd8f99c82410492c14970ef50d4d03efd98d3e&o="
          ></img>
        </div>
        <div>
          <img
            style={contentStyleImg}
            src="https://cf.bstatic.com/xdata/images/hotel/square240/20587801.webp?k=f2bf851dde89ce807cfaee75bfaf553141dc8ded4522a4499622b1d8515ed135&o="
          ></img>
        </div>
        <div>
          <img
            style={contentStyleImg}
            src="https://cf.bstatic.com/xdata/images/hotel/square240/438603683.webp?k=7c9e443957dc86d5b06967d1e1f42ad04c22bbfac1fdb6df3cfc9a607873f716&o="
          ></img>
        </div>
        <div>
          <img
            style={contentStyleImg}
            src="https://cf.bstatic.com/xdata/images/hotel/square240/174892954.webp?k=c4c4a19bc0f48dbcb5eb746836c198d8aefccd940c5977dc3d3a7824851820fd&o="
          ></img>
        </div>
        <div>
          <img
            style={contentStyleImg}
            src="https://cf.bstatic.com/xdata/images/hotel/square240/479602453.webp?k=607d43a927a0bfb7021e70a93ee55b6be457a8e976f19d34ff3a9091b5b6e4bb&o="
          ></img>
        </div>
      </Carousel>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 5,
          //column: 4,
        }}
        dataSource={HotelRooms}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ minWidth: 230 }}
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{item.name}</div>
                  <div>{item.typeRoomName}</div>
                </div>
              }
              cover={
                <Link to={`show/${item.id}`}>
                  <img
                    alt="example"
                    src={item.imageUrl}
                    height="350"
                    width="100%"
                  />
                </Link>
              }
            >
              {item.description.length > 25
                ? item.description.substring(0, 25) + "..."
                : item.description}

              {item.state ? (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <BootBtn variant="primary" size="sm" disabled>
                        Price: {item.price}
                      </BootBtn>
                    </div>
                    <div>
                      <Link to={`../order/${item.id}`}>
                        <BootBtn variant="primary" size="sm" htmlType="submit">
                          Order
                        </BootBtn>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <BootBtn variant="primary" size="sm" disabled>
                      Price: {item.price}
                    </BootBtn>
                  </div>
                  <div>
                    <BootBtn
                      variant="secondary"
                      htmlType="submit"
                      size="sm"
                      disabled
                    >
                      Order
                    </BootBtn>
                  </div>
                </div>
              )}
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
