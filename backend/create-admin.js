import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" }, {});
const prisma = new PrismaClient({ adapter });

async function createAdmin() {
  try {
    // Verificar se já existe
    const existing = await prisma.user.findUnique({
      where: { email: "admin@fotoclube.com" },
    });

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error("❌ Variável de ambiente ADMIN_PASSWORD não definida.");
      return;
    }

    if (existing) {
      console.log("✅ Usuário admin já existe!");
      console.log("Email: admin@fotoclube.com");
      return;
    }

    // Criar usuário
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const user = await prisma.user.create({
      data: {
        email: "admin@fotoclube.com",
        password: hashedPassword,
        name: "Administrador",
        role: "admin",
      },
    });

    console.log("✅ Usuário admin criado com sucesso!");
    console.log("Email: admin@fotoclube.com");
  } catch (error) {
    console.error("❌ Erro ao criar admin:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
