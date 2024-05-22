import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import HotelRoomsTableForAdmin from "./components/HotelRoomsTableForAdmin";
import CreateHotelRoom from "./components/CreateHotelRoom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="aboutus" element={<p>about us</p>} />
        <Route path="foradminlist" element={<HotelRoomsTableForAdmin />} />
        <Route path="foradminlist/create" element={<CreateHotelRoom />} />
        <Route path="*" element={<p>not found</p>} />
      </Route>
    </Routes>
  </BrowserRouter>
  //</React.StrictMode>
);
