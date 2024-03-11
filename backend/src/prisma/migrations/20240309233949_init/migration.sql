-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'PREMIUM', 'ADMIN', 'OWNER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoWatchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CryptoWatchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoWatchItem" (
    "id" TEXT NOT NULL,
    "CryptoWatchlistId" TEXT NOT NULL,
    "symbol" VARCHAR(6) NOT NULL,
    "baseCurrency" TEXT NOT NULL,
    "quoteCurrency" TEXT NOT NULL,
    "stopLoss" DOUBLE PRECISION,
    "entry" DOUBLE PRECISION,
    "buyingAt" DOUBLE PRECISION,
    "boughtOn" TIMESTAMP(3),
    "initialProfit" DOUBLE PRECISION,
    "takeProfit" DOUBLE PRECISION,
    "expiresOn" TIMESTAMP(3),
    "notifications" TEXT[],
    "note" TEXT,

    CONSTRAINT "CryptoWatchItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoWatchlist_userId_key" ON "CryptoWatchlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoWatchItem_CryptoWatchlistId_key" ON "CryptoWatchItem"("CryptoWatchlistId");

-- AddForeignKey
ALTER TABLE "CryptoWatchlist" ADD CONSTRAINT "CryptoWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoWatchItem" ADD CONSTRAINT "CryptoWatchItem_CryptoWatchlistId_fkey" FOREIGN KEY ("CryptoWatchlistId") REFERENCES "CryptoWatchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
