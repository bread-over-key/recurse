"use client"

import { updateItemAction } from "@/app/actions/item-actions";
import useItemContext from "@/providers/item-provider";
import { Item } from "@/types/item";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import OpenInVSCode from "./open-in-vscode";
import { parseVSCodeUrl } from "@/lib/vs-code";


function FileItem({ item }: { item: Item }) {

	const file = useMemo(() => {

		return parseVSCodeUrl(item.title)

	}, [item])

	if (file)
		return <OpenInVSCode filePath={file.filePath} line={file.line}>{file.fileName}</OpenInVSCode>
	else
		return <>error parsing file</>
}

function LabelComponent({ title }: { title: string }) {
	return (
		<Typography variant="h6" color="textDisabled">{title}</Typography>
	)

}

function ItemComponent({ item }: { item: Item }) {

	const { itemContext } = useItemContext();

	async function handleCollapseToggle(currentItem: Item) {
		console.log("collapse inner")
		await updateItemAction(

			currentItem.id,
			currentItem.parentId,
			currentItem.title,
			currentItem.type,
			!currentItem.collapsed,
			currentItem.done
		)

	}

	return (
		<Stack direction={"row"} justifyContent={"space-between"}>
			<Button onClick={() => itemContext?.setSelectedItem(item)}>
				{itemContext?.selectedItem == item && item.type !== "file" &&
					<Typography color="warning">{item.title}</Typography>}
				{itemContext?.selectedItem != item && item.done && item.type !== "file" &&
					<Typography color="success">{item.title}</Typography>}
				{itemContext?.selectedItem != item && !item.done && item.type !== "file" &&

					<Typography >{item.title}</Typography>}
				{
					item.type === "file"

					&&

					<FileItem item={item} />

				}
			</Button>
			<Button onClick={() => handleCollapseToggle(item)} sx={{ color: "gray" }}>
				{item.collapsed && "Show"}
				{!item.collapsed && "Collapse"}
			</Button>
		</Stack>
	)
}

export default function ItemDisplay({

	items

}: { items: Item[] }) {

	// done and undone
	const grouped: Record<string, [Item[], Item[]]> = useMemo(

		() => {


			return items.reduce<Record<string, [Item[], Item[]]>>(

				(acc, item) => {

					if (!acc[item.type]) {
						acc[item.type] = [[], []]
					}
					if (item.done)
						//done
						acc[item.type][0].push(item)
					else
						// undone
						acc[item.type][1].push(item)
					return acc
				}

				, {})


		}

		, [items])

	return <>

		{Object.keys(grouped).map((type, key) => (

			<Box key={key}>

				<LabelComponent title={type}></LabelComponent>
				{/* done */}
				{grouped[type][0].map(item => (
					<Box key={item.id}>

						<ItemComponent item={item}></ItemComponent>
						{!item.collapsed && item.children &&
							<Box ml={5}>

								<ItemDisplay items={item.children} />
							</Box>
						}
						{item.collapsed && item.children &&
							<Box ml={5}>
								...
							</Box>
						}
					</Box>
				)
				)}
				{/* undone */}
				{grouped[type][1].map(item => (
					<Box key={item.id}>

						<ItemComponent item={item}></ItemComponent>
						{!item.collapsed && item.children &&
							<Box ml={5}>

								<ItemDisplay items={item.children} />
							</Box>
						}
						{item.collapsed && item.children &&
							<Box ml={5}>
								...
							</Box>
						}
					</Box>
				)
				)}
			</Box>

		)
		)
		}
	</>

}
