import axios from "axios";

export const getStock = () => {
  return axios.get("http://localhost:9999/stock");
};

const StockService = {
  getStock: getStock,
};

export default StockService;
