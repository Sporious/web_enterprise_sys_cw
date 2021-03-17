-- CreateTable
CREATE TABLE "abtest" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "first" TEXT NOT NULL,
    "second" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "abtest.uuid_unique" ON "abtest"("uuid");
