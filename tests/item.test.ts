import { prisma } from "@/lib/prisma"
import { createArchive } from "@/lib/repoes/archive-repo";
import { archiveItems, createItem, createItemChild, getCurrentItemList, updateItem } from "@/lib/repoes/item-repo";
import { Archive } from "@/types/archive";
import { describe, it, expect } from "vitest"


describe("Item Service", () => {

	it("creates an item", async () => {

		const item = await createItem("task 1", "task");

		const dbItem = await prisma.item.findFirst({
			where: { title: 'task 1' },
		});

		expect(dbItem).not.toBeNull();
		expect(dbItem?.title).toBe('task 1');
	})


	it("create an item child", async () => {

		const item = await createItem("task 1", "task");
		const child = await createItemChild(item.id, "task 1 child", "task");

		const dbItem = await prisma.item.findFirst({
			where: { title: 'task 1 child' },
		});

		expect(dbItem).not.toBeNull();
		expect(dbItem?.title).toBe('task 1 child');
	})

	it("update an item", async () => {

		const item = await createItem("task 1", "task");
		const child = await updateItem
			(item.id, null, "task 1 updated", "task");

		const dbItem = await prisma.item.findFirst({
			where: { title: 'task 1 updated' },
		});

		expect(dbItem).not.toBeNull();
		expect(dbItem?.title).toBe('task 1 updated');
	})

	it("get current item list", async () => {

		const taskItem1 = await createItem("task 1", "task");

		const taskItem1child1 = await createItemChild(
			taskItem1.id, "task 1 child 1", "task");

		const taskItem1child1child1 = await createItemChild(
			taskItem1child1.id, "task 1 child 1 child 1", "task");

		let itemList = await getCurrentItemList();

		expect(itemList).not.toBeNull();
		console.dir(itemList, { depth: null, colors: true })
		// expect(dbItem?.title).toBe('task 1 updated');
	})



	it("archive items", async () => {

		// setup
		const taskItem1 = await createItem("task 1", "task");
		const archive: Archive =
			await createArchive("date - topic");

		// test
		await archiveItems(archive.id);

		// verify 
		const items = await getCurrentItemList();

		expect(items.length).toBe(0);

	})


})
