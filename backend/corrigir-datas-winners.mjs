import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const dbPath = "./dev.db";
const db = new Database(dbPath, {});
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` }, db);
const prisma = new PrismaClient({ adapter });

async function corrigirDatas() {
  try {
    console.log("\n🔧 Corrigindo datas de Winners sem createdAt válido...\n");

    // Buscar todos os winners
    const winners = await prisma.winner.findMany();

    console.log(`📊 Total de Winners encontrados: ${winners.length}\n`);

    let corrigidos = 0;
    const agora = new Date();

    for (const winner of winners) {
      // Verificar se createdAt é inválido ou está null
      const createdAtIsInvalid =
        !winner.createdAt ||
        !(winner.createdAt instanceof Date) ||
        isNaN(winner.createdAt.getTime());

      if (createdAtIsInvalid) {
        console.log(
          `❌ Winner ${winner.id} (${winner.title}) tem createdAt inválido:`,
          winner.createdAt
        );

        // Atualizar com data atual
        await prisma.winner.update({
          where: { id: winner.id },
          data: { createdAt: agora },
        });

        console.log(`   ✅ Atualizado para: ${agora.toISOString()}\n`);
        corrigidos++;
      } else {
        console.log(
          `✓ Winner ${winner.id} (${winner.title}) OK - createdAt: ${winner.createdAt.toISOString()}`
        );
      }
    }

    console.log(
      `\n✅ Correção concluída! ${corrigidos} Winners atualizados.\n`
    );

    await prisma.$disconnect();
    db.close();
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

corrigirDatas();
