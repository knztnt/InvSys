import axios from "axios";

const API_URL = "http://localhost:5000/api/service/ac/req/";

class AcaServiceReqService {
    create(academicId, service_no, service_name, description, reason) {
        return axios.post(API_URL + "create", {
            academicId,
            service_no,
            service_name,
            description,
            reason
        });
    }
}

export default new AcaServiceReqService();
