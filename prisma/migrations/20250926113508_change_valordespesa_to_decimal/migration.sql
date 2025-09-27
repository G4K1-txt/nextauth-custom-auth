/*
  Warnings:

  - You are about to alter the column `valorDespesa` on the `despesa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `despesa` MODIFY `valorDespesa` DECIMAL(10, 2) NOT NULL;
