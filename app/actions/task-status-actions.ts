"use server"

import { getTaskStatus } from "@/lib/repoes/item-repo"
import { TaskStatus } from "@/types/task-status"

export async function getTaskStatusAction(){

	const taskStatus: TaskStatus = await getTaskStatus();

	return taskStatus 

}
