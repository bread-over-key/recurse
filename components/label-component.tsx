import { Box, Typography } from "@mui/material";

export default function LabelComponent({ title }: { title: string }) {
	return (
		<Box ml={1}>
			<Typography variant="h6" color="textDisabled">{title}</Typography>
		</Box>
	)

}
