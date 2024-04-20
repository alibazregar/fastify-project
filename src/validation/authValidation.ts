import { RouteShorthandOptions } from "fastify";

const loginValidation: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
        },
        password: {
          type: "string",
          minLength: 8,
        },
      },
    },
  },
};

const signUpValidation: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password", "name"],
      properties: {
        email: {
          type: "string",
          format: "email",
        },
        name: {
          type: "string",
        },
        password: {
          type: "string",
          minLength: 8,
        },
      },
    },
  },
};
export { signUpValidation, loginValidation };
