/*
  Warnings:

  - Made the column `title` on table `invoice_category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `invoice_category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `invoice_category` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
