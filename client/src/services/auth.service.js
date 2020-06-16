/* Authentication Service */
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, password, roles, first_name, last_name) {
        return axios.post(API_URL + "signup", {
            username,
            password,
            roles,
            first_name,
            last_name
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();