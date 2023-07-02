/*
  Warnings:

  - You are about to drop the column `employee_id` on the `notification` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `notification_employee_id_idx` ON `notification`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `employee_id`;

-- CreateTable
CREATE TABLE `notification_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `notification_user_notification_id_idx`(`notification_id`),
    INDEX `notification_user_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `notification_role_notification_id_idx`(`notification_id`),
    INDEX `notification_role_role_id_idx`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
