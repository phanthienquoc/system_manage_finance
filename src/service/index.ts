import UserService from "./User";
import StockService from "./Stock";
import DatabaseSerivce from "./Database";

const Service = {
  User: UserService,
  Stock: StockService,
  Order: StockService,
  Database: DatabaseSerivce,
};
export default Service;
