
const openapi = {
    openapi : "3.0.0",
    info : {
        title : "sada-al-tahakom-employees" ,
        version : "1.0.0"
    },
    paths: {
        "/user/checkIn": {
            patch: {
                summary: "Register employee check-in",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["par_code"],
                                properties: { par_code: { type: "string" } },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Check-in saved" },
                    400: { description: "Invalid par_code" },
                    404: { description: "par_code not found" },
                    500: { description: "Unexpected server error" },
                },
            },
        },
        "/user/signup": {
            patch: {
                summary: "Register employee check-out",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["par_code"],
                                properties: { par_code: { type: "string" }},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                            description: "Check-out saved",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            user: { type: "object" },
                                            hours: { type: "integer" },
                                            minutes: { type: "integer" },
                                            emailSent: { type: "boolean" },
                                            warning: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                    400: { description: "Invalid par_code, or employee has no check-in" },
                    404: { description: "par_code not found" },
                    500: { description: "Unexpected server error" },
                },
            },
        },
    },
}

export default openapi ;