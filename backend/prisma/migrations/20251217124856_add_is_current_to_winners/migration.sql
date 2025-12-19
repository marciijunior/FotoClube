-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Winner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "monthWon" TEXT NOT NULL,
    "judgesNotes" TEXT NOT NULL,
    "isWinner" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 1,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Winner" ("author", "createdAt", "id", "image", "isWinner", "judgesNotes", "monthWon", "position", "title") SELECT "author", "createdAt", "id", "image", "isWinner", "judgesNotes", "monthWon", "position", "title" FROM "Winner";
DROP TABLE "Winner";
ALTER TABLE "new_Winner" RENAME TO "Winner";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
