import axios from "axios";

const API_URL = "http://localhost:5000/api/service/req/";

class StudServiceReqService {
    create(studentId, service_no, service_name, description, staffId, reason) {
        return axios.post(API_URL + "create", {
            studentId,
            service_no,
            service_name,
            description,
            staffId,
            reason
        });
    }
}

export default new StudServiceReqService();
