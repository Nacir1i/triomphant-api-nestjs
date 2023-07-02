/*
  Warnings:

  - You are about to drop the column `employee_id` on the `notification` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `notification_employee_id_idx` ON `notification`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `employee_id`;

-- CreateTable
CREATE TABLE `_notificationTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_notificationTouser_AB_unique`(`A`, `B`),
    INDEX `_notificationTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_notificationTorole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_notificationTorole_AB_unique`(`A`, `B`),
    INDEX `_notificationTorole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
