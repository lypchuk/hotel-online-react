import React from "react";
import axios from "axios";

const api = process.env.REACT_APP_HOTEL_API + "Accounts/";

export const accountsService = {
  register(model) {
    return axios.post(api + "register", model);
  },
  login(model) {
    return axios.post(api + "login", model);
  },
  logout() {
    //return axios.post(api + "logout", { refreshToken: "" });
  },
};
