/*
  Warnings:

  - You are about to drop the column `quantity` on the `order_service` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `package_service` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `quote_service` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `taxed_invoice_service` table. All the data in the column will be lost.
  - You are about to drop the `notification_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `employee_id` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `charge_payment` MODIFY `method` ENUM('CASH', 'CHEQUE', 'VIREMENT') NOT NULL;

-- AlterTable
ALTER TABLE `notification` ADD COLUMN `employee_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order_service` DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `package_service` DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `quote_service` DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `taxed_invoice_service` DROP COLUMN `quantity`;

-- DropTable
DROP TABLE `notification_role`;

-- DropTable
DROP TABLE `notification_user`;

-- CreateIndex
CREATE INDEX `notification_employee_id_idx` ON `notification`(`employee_id`);
