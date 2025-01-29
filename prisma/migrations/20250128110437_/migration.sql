-- DropForeignKey
ALTER TABLE `ordinateur` DROP FOREIGN KEY `Ordinateur_employeId_fkey`;

-- AlterTable
ALTER TABLE `ordinateur` MODIFY `employeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ordinateur` ADD CONSTRAINT `Ordinateur_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`employeId`) ON DELETE SET NULL ON UPDATE CASCADE;
