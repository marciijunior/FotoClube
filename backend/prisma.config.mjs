import { defineConfig } from "@prisma/config";

export default defineConfig({
  prisma: {
    schema: "prisma/schema.prisma",
  },
  datasource: {
    url: "file:./backend/dev.db",
  },
});
