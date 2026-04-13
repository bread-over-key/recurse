
"use client"
import { updateItemAction } from "@/app/actions/item-actions";
import useItemContext from "@/providers/item-provider";
import { Button, Card, CardContent, CardHeader, Stack, Typography, TextField, IconButton, Divider, Box } from "@mui/material";

export default function TypeSpecificCard() {
	const { itemContext } = useItemContext();


	function convertToBranch() {

		const item = itemContext?.selectedItem;

		if (item) {

			updateItemAction(
				item.id,
				item.parentId,
				item.title,
				"branch task",
				item.collapsed,
				item.done
			)

		}

	}

	function convertToBranchFailed() {

		const item = itemContext?.selectedItem;

		if (item) {

			updateItemAction(
				item.id,
				item.parentId,
				item.title,
				"branch failed",
				item.collapsed,
				true
			)

		}

	}
	// mini component


	function TaskOptions() {
		// console.log(itemContext?.selectedItem?.title)
		// console.log(itemContext?.selectedItem?.parentId)
		if (itemContext?.selectedItem?.type != "task" ||
			itemContext?.selectedItem?.parentId == null)
			return

		return <Stack>

			<Button onClick={convertToBranch}>Convert To Branch</Button>

		</Stack>

	}
	function BranchOptions() {
		// console.log(itemContext?.selectedItem?.title)
		// console.log(itemContext?.selectedItem?.parentId)
		if (!itemContext?.selectedItem?.type?.includes("branch"))
			return

		return <Stack>

			<Button onClick={convertToBranchFailed}>Convert To Branch Failed</Button>

		</Stack>

	}

	// ui

	if (itemContext?.selectedItem)


		return <Card>
			<CardHeader title="Type Specific Options" />
			<CardContent>
				{TaskOptions()}
				{BranchOptions()}
			</CardContent>

		</Card>

}	
