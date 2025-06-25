-- CreateEnum
CREATE TYPE "TeamCategory" AS ENUM ('Gents', 'Ladies', 'Training Team');

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "team_category" "TeamCategory" NOT NULL DEFAULT 'Gents';
