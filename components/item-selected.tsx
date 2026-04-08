"use client"
import { deleteItemAction, updateItemAction } from "@/app/actions/item-actions";
import { updateItem } from "@/lib/repoes/item-repo";
import useItemContext from "@/providers/item-provider";
import { Button, Card, CardContent, CardHeader, Stack, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function ItemSelected() {
	const { itemContext } = useItemContext();

	const [title, setTitle] = useState(itemContext?.selectedItem?.title);

	const [editMode, setEditMode] = useState(false)

	async function handleNameChange(e: any) {
		setTitle(e.target.value);
	}


	function handleDoneToggle() {


		const item = itemContext?.selectedItem;
		if (item) {
			console.log(item.done)
			updateItemAction(
				item.id,
				item.parentId,
				item.title,
				item.type,
				item.collapsed,
				!item.done
			)
		}


	}

	function handleDelete() {
		const item = itemContext?.selectedItem;
		const ok = window.confirm("Are you sure you want to delete?");
		if (ok)
			if (item) {

				deleteItemAction(item.id)
			}
	}

	function handleEditDone() {
		setEditMode(false)

		const item = itemContext?.selectedItem;
		if (item && title !== "") {

			updateItemAction(
				item.id,
				item.parentId,
				title ?? "error",
				item.type,
				item.collapsed,
				item.done
			)
		}
		setEditMode(false)
	}

	useEffect(() => {

		if (itemContext?.selectedItem)
			setTitle(itemContext.selectedItem.title);

	}, [itemContext?.selectedItem])

	if (itemContext?.selectedItem)


		return <Card>
			<CardHeader title={"selected item"} />
			<CardContent>

				<Stack spacing={2}>
					{/*
					<Typography variant="subtitle1">{itemContext.selectedItem.title}</Typography>
					*/}
					{editMode &&
						<Stack>
							<TextField
								value={title ?? ""}
								onChange={handleNameChange}
							></TextField>
							<Button variant="outlined" onClick={handleEditDone}>Done</Button>
						</Stack>

					}
					{!editMode &&
						<Button variant="text" onClick={() => setEditMode(true)}>{title}</Button>
					}
					<Stack direction={"row"} alignItems={"center"} spacing={2} >

						<Button variant="outlined" onClick={handleDelete}>Delete</Button>
						<Button variant="outlined" onClick={handleDoneToggle}>
							{!itemContext?.selectedItem.done && "Toggle Done"}
							{itemContext?.selectedItem.done && "Toggle Undone"}
						</Button>

						<Button variant="outlined"
							onClick={() => itemContext.setSelectedItem(undefined)}
							sx={{ ml: "auto" }}
						>
							Deselect
						</Button>

					</Stack>

				</Stack>
			</CardContent>

		</Card>

}
