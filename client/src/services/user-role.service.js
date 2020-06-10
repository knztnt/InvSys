import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

class UserRoles {
    getallAcademic() {
        return axios.get(API_URL + "academic");
    }
}

export default new UserRoles();