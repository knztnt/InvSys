import axios from "axios";

const API_URL = "http://localhost:5000/api/item/req/";

class StudItemReqService {
    create(studentId, item_no, quantity, staffId, reason) {
        return axios.post(API_URL + "create", {
            studentId,
            item_no,
            quantity,
            staffId,
            reason
        });
    }
}

export default new StudItemReqService();
