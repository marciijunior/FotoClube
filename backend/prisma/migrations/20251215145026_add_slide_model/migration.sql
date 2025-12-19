-- CreateTable
CREATE TABLE "Slide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);
