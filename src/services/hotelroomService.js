import axios from "axios";

const api = process.env.REACT_APP_HOTEL_API + "HotelRoom/";

export const HotelRoomService = {
  getAll() {
    return axios.get(api + "all");
    // return fetch(api + "all");
    // .then((res) => res.json())
    //   .then((data) => {
    //     console.log("start data");
    //     console.log(data);

    //   });
  },

  get(id) {
    return axios.get(api + id);
  },

  create(model) {
    const data = new FormData();
    for (const prop in model) {
      data.append(prop, model[prop]);
    }

    return axios.post(api, data);
  },

  delete(id) {
    return axios.delete(api + id);
  },

  edit(model) {
    return axios.put(api, model);
  },

  getTypeRoom() {
    return axios.get(api + "typeroom");
  },

  getNumberOfBeds() {
    return axios.get(api + "numberofbeds");
  },

  getNumberOfSeats() {
    return axios.get(api + "numberofseats");
  },
};
