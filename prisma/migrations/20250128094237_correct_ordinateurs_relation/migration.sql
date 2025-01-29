/*
  Warnings:

  - You are about to drop the column `age` on the `ordinateur` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `ordinateur` table. All the data in the column will be lost.
  - You are about to drop the column `mail` on the `ordinateur` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `ordinateur` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `ordinateur` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `ordinateur` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ordinateur` table. All the data in the column will be lost.
  - Added the required column `ordinateurId` to the `Ordinateur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ordinateur` DROP FOREIGN KEY `Ordinateur_userId_fkey`;

-- DropIndex
DROP INDEX `Ordinateur_mail_key` ON `ordinateur`;

-- DropIndex
DROP INDEX `Ordinateur_userId_fkey` ON `ordinateur`;

-- AlterTable
ALTER TABLE `ordinateur` DROP COLUMN `age`,
    DROP COLUMN `genre`,
    DROP COLUMN `mail`,
    DROP COLUMN `nom`,
    DROP COLUMN `password`,
    DROP COLUMN `prenom`,
    DROP COLUMN `userId`,
    ADD COLUMN `ordinateurId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Ordinateur` ADD CONSTRAINT `Ordinateur_ordinateurId_fkey` FOREIGN KEY (`ordinateurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
