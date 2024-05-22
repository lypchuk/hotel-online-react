import { React, useEffect, useState, useRef } from "react";
import { TinyColor } from "@ctrl/tinycolor";
import { SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Space, Table, Tag } from "antd";

import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

// const colors1 = ["#6253E1", "#04BEFE"];
// const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors3 = ["#40e495", "#30dd8a", "#2bb673"];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

//const api = "https://localhost:7127/api/Hotel/1";
//const api = "/api/Hotel";
//const api = "/api/Response";
//const api = "https://localhost:7127/api/Response";
//const api = "https://jsonplaceholder.typicode.com/todos";

const api = process.env.REACT_APP_HOTEL_API + "HotelRoom/all";

export default function HotelRoomsTableForAdmin() {
  const [HotelRooms, setHotelRooms] = useState([]);

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        console.log("start data");
        console.log(data);
        setHotelRooms(data);
      });
  }, []);

  // useEffect(() => {
  //   ...
  // }, [HotelRooms]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (text, item) => (
        <img src={text} alt={item.name} style={style.imageStyle}></img>
      ),
    },
    {
      title: "Number",
      dataIndex: "id",
      key: "name",
      width: "",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (text) =>
        text ? <Tag color="green">Free</Tag> : <Tag color="volcano">Busy</Tag>,
      //...getColumnSearchProps("state"),
    },
    {
      title: "Internet",
      dataIndex: "internet",
      key: "internet",
      render: (text) =>
        text ? <Tag color="green">Yes</Tag> : <Tag color="volcano">No</Tag>,
      //...getColumnSearchProps("internet"),
    },
    {
      title: "Bath",
      dataIndex: "bath",
      key: "bath",
      render: (text) =>
        text ? <Tag color="green">Yes</Tag> : <Tag color="volcano">No</Tag>,
      //...getColumnSearchProps("bath"),
    },
    {
      title: "Type Room",
      dataIndex: "typeRoomName",
      key: "typeRoomName",
      //render: (_, item) => <span>{item.typeRoom.name}</span>,
      ...getColumnSearchProps("typeRoomName"),
      sorter: (a, b) => a.typeRoomName.length - b.typeRoomName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Number Of Beds",
      dataIndex: "numberOfBedsNumber",
      key: "numberOfBedsNumber",
      //render: (_, item) => <span>{item.numberOfBeds.number}</span>,
      sorter: (a, b) => a.numberOfBedsNumber - b.numberOfBedsNumber,
      ...getColumnSearchProps("numberOfBedsNumber"),
      //sortDirections: ["descend", "ascend"],
    },
    {
      title: "Number Of Seats",
      dataIndex: "numberOfSeatsNumber",
      key: "numberOfSeatsNumber",
      sorter: (a, b) => a.numberOfSeatsNumber - b.numberOfSeatsNumber,
      //render: (_, item) => <span>{item.numberOfSeats.number}</span>,
      ...getColumnSearchProps("numberOfSeatsNumber"),
      //sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Show</a>
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Space>
        {/* <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
                colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                  colors1
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                  colors1
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large">
            Gradient 1
          </Button>
        </ConfigProvider>

        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(90deg,  ${colors2.join(", ")})`,
                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                  colors2
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                  colors2
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large">
            Gradient 2
          </Button>
        </ConfigProvider> */}

        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(116deg,  ${colors3.join(", ")})`,
                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                  colors3
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                  colors3
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Link to="create">
            <Button style={{ marginBottom: 10 }} type="primary" size="large">
              Create hotel room
            </Button>
          </Link>
        </ConfigProvider>
      </Space>

      <Table
        columns={columns}
        dataSource={HotelRooms}
        pagination={{ pageSize: 4 }}
      />
    </>
  );
}

const style = {
  imageStyle: {
    height: 50,
    width: 50,
    objectFit: "contain",
  },
};
