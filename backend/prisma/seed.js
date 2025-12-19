import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Inicialização simples - usa DATABASE_URL do .env
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpar dados antigos para evitar duplicatas (opcional)
  try {
    await prisma.event.deleteMany({});
    await prisma.winner.deleteMany({});
    await prisma.user.deleteMany({});
  } catch (e) {
    // Ignora erro se tabelas estiverem vazias
  }

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      email: "admin@fotoclube.com",
      password: hashedPassword,
      name: "Administrador",
      role: "admin",
    },
  });

  console.log("👤 Usuário admin criado: admin@fotoclube.com / admin123");

  await prisma.event.create({
    data: {
      title: "13º Encontro Fotográfico",
      date: "15, Dez-2025",
      time: "18:00 às 22:00",
      description: "Encontro oficial do clube.",
      location: "Shopping Praça Nova",
      image: "https://via.placeholder.com/150",
      category: "Encontro",
    },
  });

  await prisma.winner.create({
    data: {
      title: "Amanhecer",
      author: "Ricardo Gomes",
      image: "https://via.placeholder.com/150",
      monthWon: "Dezembro 2025",
      judgesNotes: "Cores incríveis.",
    },
  });

  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
