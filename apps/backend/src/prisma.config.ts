import "dotenv/config";
// @ts-ignore: Prisma config runtime import - types may not be available
import { defineConfig } from "prisma";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});
