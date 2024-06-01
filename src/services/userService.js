import React from "react";
import axios from "axios";

const api = process.env.REACT_APP_HOTEL_API + "Accounts/";
const saverolekey = process.env.REACT_APP_SAVE_USER_ROLE;
const saveemailkey = process.env.REACT_APP_SAVE_USER_EMAIL;

export const userService = {
  getRole(model) {
    const res = axios.post(api + "getrole", model);
    return res;
  },
  getUser(model) {
    const res = axios.post(api + "getUser", model);
    return res;
  },

  saveRoleStorage(model) {
    if (saverolekey) localStorage.setItem(saverolekey, model);
  },
  getRoleStorage() {
    if (!saverolekey) return null;
    return localStorage.getItem(saverolekey);
  },
  clearRoleStorage() {
    if (saverolekey) localStorage.removeItem(saverolekey);
  },

  saveEmailStorage(model) {
    if (saveemailkey) localStorage.setItem(saveemailkey, model);
  },
  getEmailStorage() {
    if (!saveemailkey) return null;
    return localStorage.getItem(saveemailkey);
  },
  clearEmailStorage() {
    if (saveemailkey) localStorage.removeItem(saveemailkey);
  },
};
