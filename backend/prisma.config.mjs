import { defineConfig } from '@prisma/config';

export default defineConfig({
  prisma: {
    schema: 'prisma/schema.prisma',
  },
  datasource: {
    provider: 'sqlite',
    url: 'file:./dev.db',
  },
});