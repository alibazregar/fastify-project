import fastify from "./router/index";


fastify
  .listen({ port: 3000 })
  .then((address) => {
    console.log("app is listening on" + address);
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
