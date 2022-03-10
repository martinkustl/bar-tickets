/*
  Warnings:

  - You are about to drop the `_ItemToTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ItemToTicket` DROP FOREIGN KEY `_ItemToTicket_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ItemToTicket` DROP FOREIGN KEY `_ItemToTicket_ibfk_2`;

-- DropTable
DROP TABLE `_ItemToTicket`;

-- CreateTable
CREATE TABLE `TicketsOnItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `ticketId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketsOnItems` ADD CONSTRAINT `TicketsOnItems_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketsOnItems` ADD CONSTRAINT `TicketsOnItems_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
