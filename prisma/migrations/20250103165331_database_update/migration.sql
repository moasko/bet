/*
  Warnings:

  - The primary key for the `bet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `potentialWin` on the `bet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `bet` table. All the data in the column will be lost.
  - You are about to drop the column `betEndTime` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `betStartTime` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_walletId_fkey`;

-- DropIndex
DROP INDEX `User_parainCode_key` ON `user`;

-- AlterTable
ALTER TABLE `bet` DROP PRIMARY KEY,
    DROP COLUMN `potentialWin`,
    DROP COLUMN `status`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `match` DROP COLUMN `betEndTime`,
    DROP COLUMN `betStartTime`,
    ADD COLUMN `odds` DOUBLE NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `walletId`,
    ADD COLUMN `failedAttempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `lastLogin` DATETIME(3) NULL,
    ADD COLUMN `lockoutUntil` DATETIME(3) NULL,
    MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'MANAGER', 'USER') NOT NULL DEFAULT 'USER',
    MODIFY `statuts` ENUM('ACTIVE', 'BLOKED', 'SUSPENDED', 'PENDING_VERIFICATION', 'DELETED') NOT NULL DEFAULT 'PENDING_VERIFICATION';

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserPermissions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserPermissions_AB_unique`(`A`, `B`),
    INDEX `_UserPermissions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Wallet_userId_key` ON `Wallet`(`userId`);

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPermissions` ADD CONSTRAINT `_UserPermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPermissions` ADD CONSTRAINT `_UserPermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
