-- CreateTable
CREATE TABLE "Scores" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "score" INT NOT NULL,

    PRIMARY KEY ("id")
);
