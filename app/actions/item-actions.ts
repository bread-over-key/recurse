"use server"

import { archiveItems, createItem, createItemChild, deleteItem, getCurrentItemList, updateItem } from "@/lib/repoes/item-repo";
import { Item } from "@/types/item";
import { revalidatePath } from "next/cache";

export async function createItemAction(name: string, type: string) {


	await createItem(name, type);

	revalidatePath("/")

}


export async function createItemChildAction
	(parentId: number, name: string, type: string) {

	await createItemChild(parentId, name, type);

	revalidatePath("/")

}

export async function updateItemAction
	(
		id: number,
		parentId: number | undefined,
		name: string,
		type: string,
		collapsed: boolean,
		done: boolean
	) {
	await updateItem(id, parentId, name, type, collapsed, done);
	revalidatePath("/")
}

export async function getItemsAction(): Promise<Item[]> {
	const currentItems = await getCurrentItemList();
	return currentItems;
}

export async function archiveItemsAction(archiveId: number) {
	await archiveItems(archiveId)
	revalidatePath("/")
}

export async function deleteItemAction(id: number) {

	await deleteItem(id);

	revalidatePath("/")
}
