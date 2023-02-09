import UserService from "./User";
import StockService from "./Stock";

const Service = {
  User: UserService,
  Stock: StockService,
  Order: StockService,
};
export default Service;
