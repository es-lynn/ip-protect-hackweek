/*
  Warnings:

  - Added the required column `awsAccessKey` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awsSecret` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "awsAccessKey" TEXT NOT NULL,
ADD COLUMN     "awsSecret" TEXT NOT NULL;
