-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Fotógrafo',
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Slide" ("id", "image", "order", "subtitle", "title") SELECT "id", "image", "order", "subtitle", "title" FROM "Slide";
DROP TABLE "Slide";
ALTER TABLE "new_Slide" RENAME TO "Slide";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
