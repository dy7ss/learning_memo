/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "learning_list" (
    "memo_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "category" TEXT,
    "subject_name" TEXT NOT NULL,
    "used_time" INTEGER NOT NULL,
    "study_date" TIMESTAMP(3),
    "created_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3),
    "remarks" TEXT,

    CONSTRAINT "learning_list_pkey" PRIMARY KEY ("memo_id")
);
