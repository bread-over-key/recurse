import { Item } from "@/types/item";
import { prisma } from "../prisma";
import { labelTypes } from "../label-types";

export async function createItem(name: string, type: string) {
	return await prisma.item.create({

		data: {
			title: name,
			type: type,
			collapsed: false,
			done: false
		}
	});
}

export async function createItemChild
	(parentId: number, name: string, type: string) {
	return await prisma.item.create({

		data: {
			parentId: parentId,
			title: name,
			type: type,
			collapsed: false,
			done: false
		}
	});
}

export async function updateItem
	(id: number, parentId: number | undefined, name: string, type: string, collapsed: boolean, done: boolean) {
	console.log("DELETE THIS LOG")
	console.log(collapsed)
	return await prisma.item.update({
		where: { id: id },
		data: {
			parentId: parentId,
			title: name,
			type: type,
			collapsed: collapsed,
			done: done
		}
	});
}

export async function getCurrentItemList(): Promise<Item[]> {

	let result = await prisma.item.findMany({

		where: {
			archiveId: null
		},
		orderBy: {
			id: "asc"
		}
	})

	let unsortedItems: Item[] = result.map((item) => {

		return {

			id: item.id,
			title: item.title,
			type: item.type,
			parentId: item.parentId,
			collapsed: item.collapsed,
			done: item.done

		} as Item


	})

	let tree = buildItemTree(unsortedItems);

	return tree;

}

export async function archiveItems(archiveId: number) {

	return await prisma.item.updateMany({

		where: {

			archiveId:
				null
		},
		data: {
			archiveId: archiveId
		}
	})

}


export async function deleteItem(id: number) {
	return await prisma.item.delete({ where: { id: id } })
}

// private

export function buildItemTree(items: Item[]): Item[] {
	const itemMap = new Map<number, Item>();
	const tree: Item[] = [];

	// Initialize map with items and empty children
	for (const item of items) {
		itemMap.set(item.id, { ...item, children: [] });
	}

	// Build tree while preserving order
	for (const item of items) {
		const mappedItem = itemMap.get(item.id)!;
		if (mappedItem.parentId != null && itemMap.has(mappedItem.parentId)) {
			const parent = itemMap.get(mappedItem.parentId)!;
			parent.children!.push(mappedItem);
		} else {
			tree.push(mappedItem); // root item
		}
	}

	return tree;
}


