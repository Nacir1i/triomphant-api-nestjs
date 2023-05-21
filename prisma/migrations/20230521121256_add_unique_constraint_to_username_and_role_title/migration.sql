/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `role_title_key` ON `role`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);
