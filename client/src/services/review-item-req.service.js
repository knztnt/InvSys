import axios from "axios";

const API_URL = 'http://localhost:5000/api/review-item/';

class ItemReviewService {
    create(requestId, remarks, isApproved) {
        console.log(remarks);
        return axios.post(API_URL + "create", {
            requestId, remarks, isApproved
        });
    }

    // getall() {
    //     return axios.get(API_URL + "getall");
    // }

    getApproved() {
        return axios.get(API_URL + "approved");
    }

    getIssued() {
        return axios.get(API_URL + "issued");
    }

    get(requestId) {
        return axios.get(API_URL + "get/" + requestId);
    }

    update(requestId, data) {
        console.log(data);
        return axios.put(API_URL + "update/" + requestId, { data });
    }

    // findByName(item_name) {
    //     return axios.get(API_URL + "getall?item_name=" + item_name);
    // }

    // delete(item_no) {
    //     return axios.delete(API_URL + "remove/" + item_no);
    // }
}

export default new ItemReviewService();