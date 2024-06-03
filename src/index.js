import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import HotelRoomTableForAdmin from "./components/HotelRoomTableForAdmin";
import HotelRoomForm from "./components/HotelRoomForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Show from "./components/Show";
import Order from "./components/Order";
import AboutUs from "./components/AboutUs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="foradminlist" element={<HotelRoomTableForAdmin />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="foradminlist/create" element={<HotelRoomForm />} />
        <Route path="foradminlist/edit/:id" element={<HotelRoomForm />} />
        <Route path="foradminlist/show/:id" element={<Show />} />
        <Route path="show/:id" element={<Show />} />
        <Route path="order/:id" element={<Order />} />
        <Route path="*" element={<p>not found</p>} />
      </Route>
    </Routes>
  </BrowserRouter>
  //</React.StrictMode>
);
