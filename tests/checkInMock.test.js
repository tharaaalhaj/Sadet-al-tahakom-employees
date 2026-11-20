import {jest} from "@jest/globals";

jest.unstable_mockModule("../repositories/userRepository.js", () => ({
    updateCheckIn: jest.fn(),
    findByParCode: jest.fn(),
    updateCheckOut: jest.fn(),
    updateStatus: jest.fn(),
}));


const request = (await import("supertest")).default;
const app = (await import("../app.js")).default;
const { updateCheckIn } = await import("../repositories/userRepository.js");


describe("PATCH /user/checkIn (with mock)", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("returns 404 when employee does not exist", async () => {
        updateCheckIn.mockResolvedValue(undefined);

        const res = await request(app)
            .patch("/user/checkIn")
            .send({ par_code: "9999" });

        expect(res.status).toBe(404);
    });

    test("returns 200 when employee exists" , async () => {
        updateCheckIn.mockResolvedValue({id : 1 , par_code : "1234" , check_in_time: "2026-11-13T10:00:00.000Z"});
       
        const res = await request(app).patch("/user/checkIn").send({par_code : "1234" });

        expect(res.status).toBe(200);
    });
});

