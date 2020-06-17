import axios from "axios";

const API_URL = "http://localhost:5000/api/service/ac/req/";

class AcaServiceReqService {
    create(academicId, service_no, reason) {
        return axios.post(API_URL + "create", {
            academicId,
            service_no,
            reason
        });
    }
}

export default new AcaServiceReqService();
