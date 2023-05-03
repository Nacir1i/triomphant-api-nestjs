/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "role_title_key" ON "role"("title");
