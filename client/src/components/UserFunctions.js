import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      username: newUser.username,
      password: newUser.password
    })
    .then(response => {
      console.log(response.data);
    });
};

export const login = user => {
  return axios
    .post("users/login", {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
