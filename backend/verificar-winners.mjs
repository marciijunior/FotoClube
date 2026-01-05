import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const dbPath = "./dev.db";
const db = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(db);
const prisma = new PrismaClient({ adapter });

async function verificarWinners() {
  try {
    console.log("\n🔍 Verificando Winners no banco de dados...\n");

    const winners = await prisma.winner.findMany();

    console.log(`📊 Total de Winners: ${winners.length}\n`);

    winners.forEach((winner, index) => {
      console.log(`${index + 1}. ID: ${winner.id}`);
      console.log(`   Título: ${winner.title}`);
      console.log(`   Autor: ${winner.author}`);
      console.log(`   Mês: ${winner.monthWon}`);
      console.log(`   createdAt: ${winner.createdAt}`);
      console.log(`   createdAt type: ${typeof winner.createdAt}`);
      console.log(
        `   createdAt valid: ${winner.createdAt instanceof Date && !isNaN(winner.createdAt.getTime())}`
      );
      console.log("");
    });

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

verificarWinners();
