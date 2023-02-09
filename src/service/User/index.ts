import axios from "axios";

export const getUser = () => {
  return axios.get("http://localhost:9999/user");
};

const UserService = {
  getUser: getUser,
};

export default UserService;
