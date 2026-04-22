"use client"
import { deleteItemAction, updateItemAction } from "@/app/actions/item-actions";
import { updateItem } from "@/lib/repoes/item-repo";
import useItemContext from "@/providers/item-provider";
import { Button, Card, CardContent, CardHeader, Stack, Typography, TextField, IconButton, Divider, Box } from "@mui/material";
import { useEffect, useState } from "react";
import ItemEditField from "./item-edit-field";
import { templateLabels } from "@/lib/template-labelts";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import SaveIcon from "@mui/icons-material/Save";
import { Undo } from "@mui/icons-material";

export default function ItemSelected() {
	const { itemContext } = useItemContext();

	const [title, setTitle] = useState(itemContext?.selectedItem?.title);

	const [editMode, setEditMode] = useState(false)


	// helper functions

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


	// use effect

	useEffect(() => {

		if (itemContext?.selectedItem)
			setTitle(itemContext.selectedItem.title);

	}, [itemContext?.selectedItem])

	// ui

	if (itemContext?.selectedItem)


		return <Card sx={{borderColor: "#c99e28", borderWidth: "1pt", borderStyle: "solid"}}>
			<CardContent>

				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Typography variant="h5">Selected Item</Typography>

					<IconButton
						onClick={() => itemContext.setSelectedItem(undefined)}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</Stack>


				<Stack spacing={2}>
					{/*
					<Typography variant="subtitle1">{itemContext.selectedItem.title}</Typography>
					*/}

					<Divider />

					{editMode &&
						<Stack direction="column" justifyContent={"flex-end"}>
							<ItemEditField
								value={title ?? ""}
								onChange={handleNameChange}
							></ItemEditField>
							<Box>
								<IconButton sx={{ color: "gray" }} onClick={handleEditDone}><CheckCircleIcon /></IconButton>
							</Box>
						</Stack>

					}
					{!editMode &&
						<Stack direction="row" gap={1} alignItems={"center"} justifyContent={"flex-end"}>
							<Typography variant="subtitle1" color="secondary">{title}</Typography>
							<Box>
								<IconButton sx={{ color: "gray" }} onClick={() => setEditMode(true)}>
									<EditIcon />
								</IconButton>
							</Box>
						</Stack>
					}
					<Divider />
					<Stack direction={"row"} justifyContent={"space-between"}>
						<Typography>Type</Typography>
						<Typography>{itemContext?.selectedItem?.type}</Typography>
					</Stack>
					<Divider />
					<Stack direction={"row"} justifyContent={"space-between"} spacing={2} >

						<IconButton sx={{ color: "gray" }} onClick={handleDoneToggle}>
							{!itemContext?.selectedItem.done && <CheckCircleIcon />}
							{itemContext?.selectedItem.done && <UndoIcon />}
						</IconButton>
						<IconButton sx={{ color: "gray" }} onClick={handleDelete}><DeleteIcon /></IconButton>


					</Stack>

					<Button onClick={() => itemContext.setReparent(!itemContext.reparent)}>Reparent</Button>

				</Stack>
			</CardContent>

		</Card>

}	
