-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `ibadah` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NOT NULL,
    `umur` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `komsel` BOOLEAN NOT NULL,
    `GKK` VARCHAR(191) NOT NULL,
    `KK` VARCHAR(191) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `link` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
