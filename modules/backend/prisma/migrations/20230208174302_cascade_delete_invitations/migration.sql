-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_projectUserId_fkey";

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_projectUserId_fkey" FOREIGN KEY ("projectUserId") REFERENCES "ProjectUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
