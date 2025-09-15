/*
  Warnings:

  - Added the required column `id` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `verificationtoken` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `despesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descrDespesa` VARCHAR(191) NOT NULL,
    `valorDespesa` DOUBLE NOT NULL,
    `categDespesa` VARCHAR(191) NOT NULL,
    `dataDespesa` DATETIME(3) NOT NULL,
    `despesaFixa` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
