/*
  Warnings:

  - You are about to drop the column `joinedAt` on the `team_season_members` table. All the data in the column will be lost.
  - You are about to drop the column `leftAt` on the `team_season_members` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'refunded');

-- AlterTable
ALTER TABLE "team_season_members" DROP COLUMN "joinedAt",
DROP COLUMN "leftAt",
ADD COLUMN     "joined_at" TIMESTAMP(3),
ADD COLUMN     "left_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Committee" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "committee_seasons" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "committeeId" UUID NOT NULL,
    "seasonId" UUID NOT NULL,

    CONSTRAINT "committee_seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "committee_season_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "committeeSeasonId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "is_chairman" BOOLEAN NOT NULL DEFAULT false,
    "is_treasurer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "committee_season_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "committeeSeasonId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "deadline_signup" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "location" TEXT,
    "createdById" UUID,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_signup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "activityId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "signup_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceled_at" TIMESTAMPTZ(6),
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "payment_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "activity_signup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "uploaded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,
    "activityId" UUID,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "committee_seasons_committeeId_seasonId_key" ON "committee_seasons"("committeeId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "committee_season_members_committeeSeasonId_memberId_key" ON "committee_season_members"("committeeSeasonId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "activity_signup_activityId_memberId_key" ON "activity_signup"("activityId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "photos_userId_key" ON "photos"("userId");

-- AddForeignKey
ALTER TABLE "committee_seasons" ADD CONSTRAINT "committee_seasons_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committee_seasons" ADD CONSTRAINT "committee_seasons_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committee_season_members" ADD CONSTRAINT "committee_season_members_committeeSeasonId_fkey" FOREIGN KEY ("committeeSeasonId") REFERENCES "committee_seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committee_season_members" ADD CONSTRAINT "committee_season_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_committeeSeasonId_fkey" FOREIGN KEY ("committeeSeasonId") REFERENCES "committee_seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_signup" ADD CONSTRAINT "activity_signup_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_signup" ADD CONSTRAINT "activity_signup_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
