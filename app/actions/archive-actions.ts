"use server"

import { createArchive } from "@/lib/repoes/archive-repo";
import { revalidatePath } from "next/cache";

export async function createArchiveYesterdayAction(title: string) {
	let date = new Date()
	return await createArchive(date + title);

}
async function createArchiveTodayAction(title: string) {
	await createArchive(title);


}
