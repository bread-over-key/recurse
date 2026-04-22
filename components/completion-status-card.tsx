import { Item } from "@/types/item";
import { TaskStatus } from "@/types/task-status";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

export default function CompletionStatusCard({ taskStatus }: { taskStatus: TaskStatus }) {

	return <Card>
		<CardContent >
			<Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={2}>
				<Typography>Remaining</Typography>
				<Chip label={taskStatus.undone} ></Chip>
				<Typography>Completed</Typography>
				<Chip variant="outlined" label={taskStatus.done} ></Chip>
				<Typography>Total</Typography>
				<Chip variant="outlined" label={taskStatus.total} ></Chip>
			</Stack>
		</CardContent>
	</Card>

}
