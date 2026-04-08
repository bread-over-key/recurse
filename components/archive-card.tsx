"use client"
import { createArchiveYesterdayAction } from "@/app/actions/archive-actions";
import { archiveItemsAction } from "@/app/actions/item-actions";
import { Archive } from "@/types/archive";
import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ArchiveCard() {

	const [title, setTitle] = useState("");

	function handleTitleChange(e: any) {

		setTitle(e.target.value)

	}

	async function handleArchive() {

		if (title === "") {

			prompt("title cannot be empty");

		}
		const archive: Archive = await createArchiveYesterdayAction(title);
		await archiveItemsAction(archive.id);
	}

	return (

		<Card>
			<CardContent>
				<Stack direction={"row"} spacing={2} alignItems={"center"}>

					<Typography>current date</Typography>
					<TextField value={title} onChange={handleTitleChange}></TextField>
					<Button onClick={handleArchive}>Archive</Button>

				</Stack>
			</CardContent>
		</Card>
	)
}
