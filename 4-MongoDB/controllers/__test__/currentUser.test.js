const request = require("supertest");
const app = require("../../app");


jest.setTimeout(60000);

describe("Testing the Protected Route currentUser", () => {
    let accessToken;

    beforeAll(async () => {
        // Sign in the user to get the access token
        const signInResponse = await request(app)
            .post('/api/auth/signin')
            .send({
                email: "testings@gmail.com",
                password: "1243@sdf"
            });

        // Check if the set-cookie header exists
        if (signInResponse.headers['set-cookie']) {
            // Extract the access token from the response cookies
            accessToken = signInResponse.headers['set-cookie'][0].split('=')[1].split(';')[0];
        } else {
            throw new Error('No set-cookie header found in the response');
        }
    });

    it("returns the currentUser on Successful request", async () => {
        // Make a request to currentUser using the obtained access token
        const response = await request(app)
            .get('/api/auth/currentUser')
            .set('Cookie', `accessToken=${accessToken}`)
            .expect(200);

        // Assert that the response contains the currentUser data
        expect(response.body.status).toBe("Success");
        expect(response.body.currentUser).toBeDefined();
        // Additional assertions based on your response structure
    });

    afterAll(async () => {
        // Clean up after the test by deleting the test user or any other necessary actions
    });
});
