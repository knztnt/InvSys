import auth from "../auth.service";
import mockAxios from 'axios';

describe('Authentication API calls Testing', () => {
    it("login function", async () => {
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: { usertoken: "abcd1234" }
            })
        );

        const authCredentials = await auth.login("test", "12345678");

        expect(authCredentials.usertoken).toEqual("abcd1234");
    });
});