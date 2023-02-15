import axios from "axios";

export const getDatabase = () => {
  return axios.get("http://localhost:9999/database");
};

const DatabaseService = {
  getDatabase,
};

export default DatabaseService;
