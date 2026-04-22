"use client"
import { createItemAction, createItemChildAction } from "@/app/actions/item-actions";
import { getTypeSubTypes } from "@/lib/services/item-service";
import useItemContext from "@/providers/item-provider";
import { Button, Card, CardContent, CardHeader, Input, Stack, TextField, Typography } from "@mui/material";
import { isObjectEnumValue } from "@prisma/client/runtime/client";
import { useMemo, useState } from "react";
import ItemEditField from "./item-edit-field";
import { templateLabels } from "@/lib/template-labelts";

export default function ItemCreation() {

	// hooks

	const { itemContext } = useItemContext();
	const [itemName, setItemName] = useState("");

	const labels: string[] = useMemo(() => {
		if (itemContext?.selectedItem) {
			console.log(itemContext?.selectedItem?.type)
			const types = getTypeSubTypes(itemContext?.selectedItem?.type) ?? []

			console.log(types)
			return types

		}

		return []

	}, [itemContext?.selectedItem])

	// handlers

	async function handleAddItem(type: string) {

		if (itemName == "") return

		if (itemContext?.selectedItem) {

			await createItemChildAction(

				itemContext?.selectedItem.id,
				itemName,
				type

			)

		}
		else {

			await createItemAction(itemName, type)

		}

		setItemName("")
	}

	function handleNameChange(name: string) {

		setItemName(name)

	}
	function addTemplateText(text: string) {

		setItemName(text)

	}

	// use effect

	// mini component

	function LabelDisplay(props: { children: React.ReactNode }) {
		return <Stack
			gap={2}
			direction={"row"}
			flexWrap={"wrap"}
			alignItems={"center"}
			alignContent={"left"}
		>


			{props.children}
		</Stack>
	}

	// ui

	return <Card>

		<CardHeader title={"Add Item"}></CardHeader>

		<CardContent>
			<Stack spacing={2}>


				<ItemEditField

					value={itemName}
					onChange={e => handleNameChange(e.target.value)}
				/>

				<Typography variant="h6" color="textSecondary">Labels</Typography>

				{itemContext?.selectedItem == undefined &&

					<LabelDisplay>
						<Button
							onClick={() => handleAddItem("task")}
							variant="outlined"
						>
							task
						</Button>
						<Button
							onClick={() => handleAddItem("theoretical component - task")}
							variant="outlined"
						>
							theoretical component - task
						</Button>
						<Button
							onClick={() => handleAddItem("pyhical component - task")}
							variant="outlined"
						>
							pyhical component - task
						</Button>


						<Button
							onClick={() => handleAddItem("research")}
							variant="outlined"
						>
							research
						</Button>

						<Button
							onClick={() => handleAddItem("theoretical component - research")}
							variant="outlined"
						>
							theoretical component - research
						</Button>

						<Button
							onClick={() => handleAddItem("physical component - research")}
							variant="outlined"
						>
							physical component - research
						</Button>
					</LabelDisplay>
				}

				{itemContext?.selectedItem &&
					<LabelDisplay>

						{labels.map((label, key) => (


							<Button
								key={key}
								onClick={() => handleAddItem(label)}
								variant="outlined"
								color={label === "task" || label === "research" ? "secondary" : "primary"}
							>
								{label}
							</Button>

						))}
					</LabelDisplay>
				}
				<Stack spacing={2}>
					<Typography variant="h6" color="textSecondary">Templates</Typography>

					{templateLabels.map((label, index) => (

						<Button key={index} onClick={() => addTemplateText(label)} variant="outlined">{label}</Button>

					))}

				</Stack>
			</Stack>
		</CardContent>
	</Card>


}
