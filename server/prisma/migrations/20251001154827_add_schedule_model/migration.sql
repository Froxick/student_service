-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "lessonNumber" INTEGER NOT NULL,
    "classroom" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Schedule_groupName_idx" ON "Schedule"("groupName");

-- CreateIndex
CREATE INDEX "Schedule_date_idx" ON "Schedule"("date");

-- CreateIndex
CREATE INDEX "Schedule_teacher_idx" ON "Schedule"("teacher");

-- CreateIndex
CREATE INDEX "Schedule_groupName_date_idx" ON "Schedule"("groupName", "date");
