"use client"

import { updateItemAction } from "@/app/actions/item-actions";
import useItemContext from "@/providers/item-provider";
import { Item } from "@/types/item";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import OpenInVSCode from "./open-in-vscode";
import { parseVSCodeUrl } from "@/lib/vs-code";
import LabelComponent from "./label-component";
import ItemComponent from "./item-component";




export default function ItemDisplay({

	items

}: { items: Item[] }) {
	const { itemContext } = useItemContext()
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
		{itemContext?.reparent && <Typography variant="caption" color="warning">REPARENT</Typography>}

		{Object.keys(grouped).map((type, key) => (

			<Box key={key} sx={{ borderLeftColor: "#2a2a2a", borderLeftWidth: "1pt", borderLeftStyle: "dotted" }}>

				<LabelComponent title={type}></LabelComponent>
				{/* done */}
				{grouped[type][0].map(item => (
					<Box key={item.id}>

						{
							(!itemContext?.reparent || item.id != itemContext?.selectedItem?.id)
							&&
							<>
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
							</>
						}
					</Box>
				)
				)}
				{/* undone */}
				{grouped[type][1].map(item => (
					<Box key={item.id}>

						{
							(!itemContext?.reparent || item.id != itemContext?.selectedItem?.id)
							&&
							<>
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
							</>
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
