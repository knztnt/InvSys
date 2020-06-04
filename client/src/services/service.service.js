import axios from "axios";

const API_URL = "http://localhost:5000/api/services/";

class DeptService {
  create(service_no, service_name, description, availability) {
    return axios.post(API_URL + "create", {
      service_no,
      service_name,
      description,
      availability,
    });
  }

  getall() {
    return axios.get(API_URL + "getall");
  }

  get(service_no) {
    console.log(service_no);
    return axios.get(API_URL + service_no);
  }

  update(service_no, data) {
    console.log(data);
    return axios.put(API_URL + "update/" + service_no, { data });
  }

  findByName(service_name) {
    return axios.get(API_URL + "getall?service_name=" + service_name);
  }

  delete(service_no) {
    return axios.delete(API_URL + "remove/" + service_no);
  }
}

export default new DeptService();
