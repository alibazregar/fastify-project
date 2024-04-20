import Controller from "./controller";
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}
interface LoginRequestBody {
  email: string;
  password: string;
}

class AuthController extends Controller {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as LoginRequestBody;
    const user = await this.collections.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return reply.status(400).send({ message: "invalid inputs" });
    }
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      return reply.status(401).send({ message: "invalid inputs" });
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.AUTH_SECRET_KEY ?? "TEST",
      { expiresIn: "10d" }
    );
    return reply.status(200).send({ message: "logIn was successful", token });
  }
  async register(request: FastifyRequest, reply: FastifyReply) {
    reply.type("application/json");
    const body = request.body as RegisterRequestBody;
    const isUserExists = await this.collections.user.findUnique({
      where: { email: body.email },
    });
    if (isUserExists) {
      return reply
        .status(400)
        .send({ message: "user already exists with this credentials!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    const newUser = await this.collections.user.create({
      data: { email: body.email, password: hashedPassword, name: body.name },
    });
    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.AUTH_SECRET_KEY ?? "TEST",
      { expiresIn: "10d" }
    );
    return reply.status(200).send({ message: "signed up successfuly", token });
  }
}
export default new AuthController();
