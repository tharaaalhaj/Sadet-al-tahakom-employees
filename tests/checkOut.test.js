import request from "supertest";
import app from "../app.js";


describe("PATCH/user/checkOut" , () => {

    test("returning when par_cod is missing" , async () => {
        const res = await request(app).patch("/user/signup").send({});

        expect(res.status).toBe(400);
    });
});
