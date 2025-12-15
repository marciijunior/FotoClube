import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// Inicialização simples (o Prisma pega a URL do arquivo de config automaticamente)
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Inicialização com driver adapter para o modo "client" (JS-only)
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpar dados antigos para evitar duplicatas (opcional)
  try {
    await prisma.event.deleteMany({});
    await prisma.winner.deleteMany({});
  } catch (e) {
    // Ignora erro se tabelas estiverem vazias
  }

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
