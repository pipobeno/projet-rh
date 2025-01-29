/*
  Warnings:

  - The primary key for the `employe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employeId` on the `employe` table. All the data in the column will be lost.
  - Added the required column `id` to the `Employe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Employe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ordinateur` DROP FOREIGN KEY `Ordinateur_employeId_fkey`;

-- AlterTable
ALTER TABLE `employe` DROP PRIMARY KEY,
    DROP COLUMN `employeId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userid` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ordinateur` ADD CONSTRAINT `Ordinateur_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
