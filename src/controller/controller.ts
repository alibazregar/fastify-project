import autoBind from "auto-bind";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class Controller {
  collections: PrismaClient;
  constructor() {
    autoBind(this);
    this.collections = prisma;
  }
}
