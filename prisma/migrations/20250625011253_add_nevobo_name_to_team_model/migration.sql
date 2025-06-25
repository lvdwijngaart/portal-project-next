/*
  Warnings:

  - You are about to drop the column `nevoboPouleId` on the `team_seasons` table. All the data in the column will be lost.
  - You are about to drop the column `nevoboRegion` on the `team_seasons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team_seasons" DROP COLUMN "nevoboPouleId",
DROP COLUMN "nevoboRegion",
ADD COLUMN     "nevobo_poule_id" TEXT,
ADD COLUMN     "nevobo_region" TEXT,
ADD COLUMN     "photoId" UUID;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "nevobo_name" TEXT;

-- AddForeignKey
ALTER TABLE "team_seasons" ADD CONSTRAINT "team_seasons_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
