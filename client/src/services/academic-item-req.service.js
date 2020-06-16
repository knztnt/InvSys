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
}

export default new AcaItemReqService();
