/*
  Warnings:

  - Added the required column `collapsed` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `done` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "collapsed" BOOLEAN NOT NULL,
ADD COLUMN     "done" BOOLEAN NOT NULL;
