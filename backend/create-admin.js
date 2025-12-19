import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Verificar se já existe
    const existing = await prisma.user.findUnique({
      where: { email: "admin@fotoclube.com" }
    });

    if (existing) {
      console.log("✅ Usuário admin já existe!");
      console.log("Email: admin@fotoclube.com");
      console.log("Senha: admin123");
      return;
    }

    // Criar usuário
    const hashedPassword = await bcrypt.hash("admin123", 10);
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
    console.log("Senha: admin123");
  } catch (error) {
    console.error("❌ Erro ao criar admin:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
