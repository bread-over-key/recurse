-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_parentId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
