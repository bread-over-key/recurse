"use server"
import { Item } from "@/types/item";
import { Box, Card, CardContent, CardHeader, Container, Stack, Typography } from "@mui/material";

import Image from "next/image";
import { getItemsAction } from "./actions/item-actions";
import ItemDisplay from "@/components/item-display";
import ItemCreation from "@/components/item-creation";
import ItemSelected from "@/components/item-selected";
import ArchiveCard from "@/components/archive-card";
import MiniGameCard from "@/components/minigame-card";
import TypeSpecificCard from "@/components/type-specific-card";
import CompletionStatusCard from "@/components/completion-status-card";
import { TaskStatus } from "@/types/task-status";
import { getTaskStatusAction } from "./actions/task-status-actions";

export default async function Home() {

	const items: Item[] = await getItemsAction();
	const taskStatus: TaskStatus = await getTaskStatusAction();

	return (
		<Container>
			<Box mt={5} />
			<Typography variant="h3">Daily</Typography>
			<Box mt={5} />
			<Stack
				gap={2}
				direction={"row"}
				sx={{ width: "100%" }}
			// flexWrap={"wrap"}
			>

				<Stack spacing={2} flexBasis={"75%"}>
					<CompletionStatusCard taskStatus={taskStatus} />
					<Card>
						<CardHeader title="Items" />
						<CardContent>
							{<p style={{ color: "#666666" }}>add research for when you do not know where X goes</p>}
							<ItemDisplay items={items}></ItemDisplay>
						</CardContent>
					</Card>
				</Stack>

				<Stack spacing={2} minWidth={"200pt"} flexBasis={"20%"}>
					<ItemSelected></ItemSelected>
					<ItemCreation></ItemCreation>
					<TypeSpecificCard />
					<ArchiveCard />
					<MiniGameCard></MiniGameCard>
				</Stack>

			</Stack>
		</Container >
	);
}
