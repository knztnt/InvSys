const API_URL = "http://localhost:5000/api/auth/";

export default {
    get: jest.fn(() => Promise.resolve({ data: {} })),

    post: jest.fn((url) => {
        if (url === API_URL + '/signin') {
            return Promise.resolve({
                data: {}
            });
        }
    })
}