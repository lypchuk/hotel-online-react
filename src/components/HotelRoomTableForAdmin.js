import { React, useEffect, useState, useRef } from "react";
import { TinyColor } from "@ctrl/tinycolor";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  ConfigProvider,
  Input,
  Space,
  Table,
  Tag,
  Popconfirm,
  message,
} from "antd";
import { HotelRoomService } from "../services/hotelroomService";
import { userService } from "../services/userService";
// const colors1 = ["#6253E1", "#04BEFE"];
// const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors3 = ["#40e495", "#30dd8a", "#2bb673"];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

//const api = "https://jsonplaceholder.typicode.com/todos";

// const api = process.env.REACT_APP_HOTEL_API + "HotelRoom/all";

export default function HotelRoomsTableForAdmin() {
  const [HotelRooms, setHotelRooms] = useState([]);

  const deleteHandler = async (id) => {
    // console.log(id);
    const res = await HotelRoomService.delete(id);
    if (res.status === 200) {
      message.success("Hotel room deleted");
      setHotelRooms(HotelRooms.filter((x) => x.id != id));
    } else {
      message.error("Something wrong");
    }
  };

  const loadHotelRoom = async () => {
    const res = await HotelRoomService.getAll();
    // const data = await res.json();
    setHotelRooms(res.data);
  };

  useEffect(() => {
    loadHotelRoom();
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

  const getColumns = (deleteHandler) => [
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
      render: (text) =>
        text.length > 20 ? text.substring(0, 20) + "..." : text,

      //
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
          {/* <Button>Show</Button> */}

          <Link to={`../show/${record.id}`}>
            <Button>Show</Button>
          </Link>

          <Link to={`edit/${record.id}`}>
            <Button>Edit</Button>
          </Link>

          <Popconfirm
            title="Delete the hotel room"
            description={`Are you sure to delete this ${record.name}?`}
            onConfirm={() => deleteHandler(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>

          {/* <a>Delete</a> */}
        </Space>
      ),
    },
  ];

  if (userService.getRoleStorage() != "admin") return <Navigate to="/" />;

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
        columns={getColumns(deleteHandler)}
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
