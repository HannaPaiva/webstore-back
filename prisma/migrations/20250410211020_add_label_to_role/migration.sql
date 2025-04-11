/*
  Warnings:

  - Added the required column `label` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "label" TEXT NOT NULL;
