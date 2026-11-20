import { jest } from "@jest/globals";

jest.unstable_mockModule("../repositories/userRepository.js", () => ({
    updateCheckIn: jest.fn(),
    findByParCode: jest.fn(),
    updateCheckOut: jest.fn(),
    updateStatus: jest.fn(),
}));

jest.unstable_mockModule("../emailService.js", () => ({
    sendEmailToManager: jest.fn(),
}));

const request = (await import("supertest")).default;
const app = (await import("../app.js")).default;
const { findByParCode, updateCheckOut, updateStatus } =
    await import("../repositories/userRepository.js");
const { sendEmailToManager } = await import("../emailService.js");


describe("PATCH /user/checkOut (with mock)", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("returns 404 when employee does not exist", async () => {
        findByParCode.mockResolvedValue(undefined);

        const res = await request(app)
            .patch("/user/signup")
            .send({ par_code: "9999" });

        expect(res.status).toBe(404);
    });

    test("returns 400 when employee has no check-in", async () => {

        findByParCode.mockResolvedValue({id: 1, name: "Ahmad", par_code: "1234", check_in_time: null});

        const res = await request(app)
            .patch("/user/signup")
            .send({ id: 1, name: "Ahmad", par_code: "1234", check_in_time: null });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("CheckIn not found");
    });


    test("sets status to signup and sends no email when worked 6+ hours", async () => {
        findByParCode.mockResolvedValue({
            id: 1, par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
        });

        updateCheckOut.mockResolvedValue({
            id: 1 , par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
            check_out_time: "2026-11-13T15:00:00.000Z",            
        });

        updateStatus.mockResolvedValue({ id: 1, par_code: "1234", status: "signup" });

        const res = await request(app).patch("/user/signup").send({ par_code: "1234" });

        expect(res.status).toBe(200);
        expect(res.body.user.status).toBe("signup");
        expect(sendEmailToManager).not.toHaveBeenCalled();
    });


    test("sets status to signup and sends no email when worked 6 hours", async () => {
        findByParCode.mockResolvedValue({
            id: 1, par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
        });

        updateCheckOut.mockResolvedValue({
            id: 1 , par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
            check_out_time: "2026-11-13T14:00:00.000Z",            
        });

        updateStatus.mockResolvedValue({ id: 1, par_code: "1234", status: "signup" });

        const res = await request(app).patch("/user/signup").send({ par_code: "1234" });

        expect(res.status).toBe(200);
        expect(res.body.user.status).toBe("signup");
        expect(sendEmailToManager).not.toHaveBeenCalled();
    });


    test("sets status to not complete and sends email when worked less than 6 hours", async () => {
        findByParCode.mockResolvedValue({
            id: 1, par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
        });

        updateCheckOut.mockResolvedValue({
            id: 1 , par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
            check_out_time: "2026-11-13T10:00:00.000Z",            
        });

        updateStatus.mockResolvedValue({ id: 1, par_code: "1234", status: "not complete" });

        const res = await request(app).patch("/user/signup").send({ par_code: "1234" });

        expect(res.status).toBe(200);
        expect(res.body.user.status).toBe("not complete");
        expect(sendEmailToManager).toHaveBeenCalled();
        expect(res.body.emailSent).toBe(true);
    });


    test("returns 200 with warning when manager email fails", async () => {
        findByParCode.mockResolvedValue({
            id: 1,par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
        });

        updateCheckOut.mockResolvedValue({
            id: 1, par_code: "1234",
            check_in_time: "2026-11-13T08:00:00.000Z",
            check_out_time: "2026-11-13T10:00:00.000Z",
        });

        updateStatus.mockResolvedValue({ id: 1, par_code: "1234", status: "not complete" });

        sendEmailToManager.mockRejectedValue(new Error("fail"));  

        const res = await request(app).patch("/user/signup").send({ par_code: "1234" });

        expect(res.status).toBe(200);
        expect(res.body.emailSent).toBe(false);
        expect(res.body.warning).toBe("Check-out saved but manager email failed");
    });

});

