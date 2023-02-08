-- CreateEnum
CREATE TYPE "IPType" AS ENUM ('ipv4', 'ipv6');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "ipType" "IPType" NOT NULL DEFAULT 'ipv4';
