import axios from "axios";

const API_URL = 'http://localhost:5000/api/item/';

class ItemService {
    create(item_no, item_name, quantity, description, availability) {
        return axios.post(API_URL + "create", {
            item_no,
            item_name,
            quantity,
            description,
            availability
        });
    }

    getall() {
        return axios.get(API_URL + "getall");
    }

    getItem(item_no) {
        return axios.get(API_URL + item_no);
    }

    update(item_no, data) {
        return axios.put(API_URL + "update" + item_no, { data });
    }
}

export default new ItemService();