import { FastifyInstance } from "fastify";
import authController from "src/controller/authController";
import {
  loginValidation,
  signUpValidation,
} from "src/validation/authValidation";

const authRouter = async (fastify: FastifyInstance, options: any) => {
  fastify.post("/login", loginValidation, authController.login);
  fastify.post("/register", signUpValidation, authController.register);
};

export default authRouter;
