import axios from "axios";

const API_URL = "http://localhost:5000/api/service/req/";

class StudServiceReqService {
    create(studentId, service_no, staffId, reason) {
        return axios.post(API_URL + "create", {
            studentId,
            service_no,
            staffId,
            reason
        });
    }
}

export default new StudServiceReqService();
