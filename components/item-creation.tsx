"use client"
import { createItemAction, createItemChildAction } from "@/app/actions/item-actions";
import { getTypeSubTypes } from "@/lib/services/item-service";
import useItemContext from "@/providers/item-provider";
import { Button, Card, CardContent, CardHeader, Input, Stack, TextField, Typography } from "@mui/material";
import { isObjectEnumValue } from "@prisma/client/runtime/client";
import { useMemo, useState } from "react";

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

	// use effect

	// ui

	return <Card>

		<CardHeader title={"Add Item"}></CardHeader>

		<CardContent>
			<Stack spacing={2}>


				<TextField

					label="item name"
					value={itemName}
					onChange={e => handleNameChange(e.target.value)}

				/>

				{itemContext?.selectedItem == undefined &&

					<Stack

						spacing={2}
						direction={"row"}
						flexWrap={"wrap"}
						alignItems={"center"}
						alignContent={"left"}
					>

						<Button
							onClick={() => handleAddItem("task")}
							variant="outlined"
						>
							task
						</Button>

						<Button
							onClick={() => handleAddItem("research")}
							variant="outlined"
						>
							research
						</Button>

					</Stack>
				}

				{itemContext?.selectedItem &&

					<Stack
						spacing={2}
						direction={"row"}
						flexWrap={"wrap"}
						alignItems={"center"}
						alignContent={"left"}
					>


						{labels.map((label, key) => (


							<Button
								key={key}
								onClick={() => handleAddItem(label)}
								variant="outlined"
							>
								{label}
							</Button>

						))}

					</Stack>

				}
			</Stack>
		</CardContent>
	</Card>


}
