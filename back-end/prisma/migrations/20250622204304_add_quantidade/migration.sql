/*
  Warnings:

  - Added the required column `quantidade` to the `ClienteProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `ClienteServico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clienteproduto` ADD COLUMN `quantidade` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `clienteservico` ADD COLUMN `quantidade` INTEGER NOT NULL;
