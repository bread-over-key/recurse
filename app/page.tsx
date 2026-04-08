"use server"
import { Item } from "@/types/item";
import { Box, Card, CardContent, CardHeader, Container, Stack, Typography } from "@mui/material";

import Image from "next/image";
import { getItemsAction } from "./actions/item-actions";
import ItemDisplay from "@/components/item-display";
import ItemCreation from "@/components/item-creation";
import ItemSelected from "@/components/item-selected";
import ArchiveCard from "@/components/archive-card";
import { PremadeTasks } from "@/components/premade-tasks";

export default async function Home() {

	const items: Item[] = await getItemsAction();

	return (
		<Container>
			<Box mt={5} />
			<Typography variant="h3">Task</Typography>
			<Box mt={5} />
			<Stack spacing={2} direction={"row"} sx={{ width: "100%" }}>
				<Stack spacing={2} flexGrow={1}>
					<Card>
						<CardHeader title="Items" />
						<CardContent>
							<ItemDisplay items={items}></ItemDisplay>
						</CardContent>
					</Card>
				</Stack>
				<Stack spacing={2}>
					<ItemSelected></ItemSelected>
					<ItemCreation></ItemCreation>
					<PremadeTasks></PremadeTasks>
					<ArchiveCard />
				</Stack>
			</Stack>
		</Container >
	);
}
