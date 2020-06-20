import axios from "axios";

const API_URL = "http://localhost:5000/api/item/ac/req/";

class AcaItemReqService {
    create(academicId, item_no, quantity, reason) {
        return axios.post(API_URL + "create", {
            academicId,
            item_no,
            quantity,
            reason
        });
    }

    get(requestId) {
        return axios.get(API_URL + "get/" + requestId);
    }

    getall() {
        return axios.get(API_URL + "getall");
    }

    update(requestId, data) {
        console.log(data);
        return axios.put(API_URL + "update/" + requestId, { data });
    }
}

export default new AcaItemReqService();
