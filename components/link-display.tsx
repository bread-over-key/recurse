import { Box, Button, Typography } from "@mui/material";

function getDomain(url: string) {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}

function getFavicon(domain: string) {
	return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

export function LinkDisplay({ href }: { href: string }) {
	const domain = getDomain(href);
	const favicon = getFavicon(domain);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 2,
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 1,
				transition: "all 0.15s ease",
				"&:hover": {
					backgroundColor: "action.hover",
					borderColor: "primary.transform",
					transform: "translateY(-1px)",
				},
			}}
		>
			{/* Left side */}
			<Box sx={{

				ml: "20pt", 
				display: "flex",  gap: 1 }}>
			<img
				src={favicon}
				alt=""
				width={16}
				height={16}
				onError={(e) => {
					(e.currentTarget as HTMLImageElement).style.display = "none";
				}}
			/>
			<Typography variant="body2">{domain}</Typography>
		</Box>

			{/* Right side */ }
	<Button
		size="small"
		variant="outlined"
		onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
	>
		Open
	</Button>
		</Box >
	);
}
