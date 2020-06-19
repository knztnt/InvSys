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

    getall() {
        return axios.get(API_URL + "getall");
    }

    update(requestId, data) {
        console.log(data);
        return axios.put(API_URL + "update/" + requestId, { data });
    }
}

export default new AcaServiceReqService();
