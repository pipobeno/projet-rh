/*
  Warnings:

  - You are about to drop the column `ordinateurId` on the `ordinateur` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeId]` on the table `Ordinateur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeId` to the `Ordinateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ordinateur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ordinateur` DROP FOREIGN KEY `Ordinateur_ordinateurId_fkey`;

-- DropIndex
DROP INDEX `Ordinateur_ordinateurId_fkey` ON `ordinateur`;

-- AlterTable
ALTER TABLE `ordinateur` DROP COLUMN `ordinateurId`,
    ADD COLUMN `employeId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Employe` (
    `employeId` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `genre` VARCHAR(191) NULL,

    UNIQUE INDEX `Employe_email_key`(`email`),
    PRIMARY KEY (`employeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Ordinateur_employeId_key` ON `Ordinateur`(`employeId`);

-- AddForeignKey
ALTER TABLE `Ordinateur` ADD CONSTRAINT `Ordinateur_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`employeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ordinateur` ADD CONSTRAINT `Ordinateur_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
