
"use client"

import { updateItemAction } from "@/app/actions/item-actions";
import useItemContext from "@/providers/item-provider";
import { Item } from "@/types/item";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import OpenInVSCode from "./open-in-vscode";
import { parseVSCodeUrl } from "@/lib/vs-code";
import FileItem from "./file-item";
import CodeViewer from "./code-block";
import Markdown from "./markdown";
import { LinkDisplay } from "./link-display";

export default function ItemComponent({ item }: { item: Item }) {

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

	// helpers

	function renderItemName() {
		if (item.type === "code") {
			return <CodeViewer code={item.title} />
		}
		if (item.type === "info (markdown)") {
			return <Markdown content={item.title} />
		}
		if (item.type === "link") {
			return <LinkDisplay href={item.title} />
		}
		if (itemContext?.selectedItem == item && item.type !== "file") {
			return <Typography color="warning">{item.title}</Typography>
		}
		else if (itemContext?.selectedItem != item && item.done && item.type !== "file") {
			return <Typography color="success">{item.title}</Typography>
		}

		else if (item.type === "file") {
			return <FileItem item={item} />
		}


		else if (itemContext?.selectedItem != item && !item.done && item.type !== "file") {
			// normal
			if (item.type == "task" || item.type == "research")
				return <Typography sx={{ color: "#90caf9" }}>{item.title}</Typography>
			else
				return <Typography sx={{ color: "#bababa", textTransform: "uppercase" }} >{item.title}</Typography>
		}
		return <>item render error</>

	}


	// ui

	return (
		<Stack direction={"row"} justifyContent={"space-between"}>
			<div className="px-4 py-2 hover:cursor-pointer rounded hover:bg-[#292929] transition duration-300" onClick={() => itemContext?.setSelectedItem(item)}>
				{renderItemName()}
			</div>
			<Button onClick={() => handleCollapseToggle(item)} sx={{ color: "gray" }}>
				{item.collapsed && "Show"}
				{!item.collapsed && "Collapse"}
			</Button>
		</Stack>
	)
}

const style = {
	color: "#0303af"
}
