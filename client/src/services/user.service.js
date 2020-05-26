/* Data service */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getStudentBoard() {
        return axios.get(API_URL + 'student', { headers: authHeader() });
    }

    getNonAcBoard() {
        return axios.get(API_URL + 'non-academic', { headers: authHeader() });
    }

    getAcademicBoard() {
        return axios.get(API_URL + 'academic', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();