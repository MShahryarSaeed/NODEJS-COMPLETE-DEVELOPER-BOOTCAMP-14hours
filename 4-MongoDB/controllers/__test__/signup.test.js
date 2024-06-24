const request = require("supertest");

const app = require("../../app");

jest.setTimeout(60000);

describe("Testing the Signup route", () => {

    it("returns the 201 on Successfull request", async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                username: "testing",
                email: "testings@gmail.com",
                password: "1243@sdf"
            })
            .expect(201)
    })
})