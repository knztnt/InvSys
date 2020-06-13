import axios from "axios";

const API_URL = "http://localhost:5000/api/item/req/";

class StudItemReqService {
  create(
    studentId,
    item_no,
    item_name,
    quantity,
    description,
    staffId,
    reason
  ) {
    return axios.post(API_URL + "create", {
      studentId,
      item_no,
      item_name,
      quantity,
      description,
      staffId,
      reason,
    });
  }
  getall() {
    return axios.get(API_URL + "getall");
  }

  get(service_no) {
    return axios.get(API_URL + service_no);
  }
}

export default new StudItemReqService();
