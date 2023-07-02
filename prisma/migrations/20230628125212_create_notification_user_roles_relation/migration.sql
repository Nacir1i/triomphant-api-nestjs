/*
  Warnings:

  - You are about to drop the `_notificationTorole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_notificationTouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `_notificationTorole`;

-- DropTable
DROP TABLE `_notificationTouser`;

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
