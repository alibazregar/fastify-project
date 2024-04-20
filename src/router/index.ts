import Fastify from "fastify";
import cors from "@fastify/cors";
import Ajv from "ajv";
import authRouter from "./authRouter";

const fastify = Fastify({
  logger: true,
});
const ajv = new Ajv({ allErrors: true });

fastify.setValidatorCompiler(({ schema }) => {
  return ajv.compile(schema);
});
fastify.register(cors, {});
fastify.register(authRouter, { prefix: "/auth" });

export default fastify;
