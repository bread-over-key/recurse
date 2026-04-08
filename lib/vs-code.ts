type VSCodeLinkData = {
	filePath: string;
	line: number;
	// column: number;
	fileName: string;
};

export function parseVSCodeUrl(url: string): VSCodeLinkData | null {
	try {
		// Remove protocol
		// const prefix = "vscode://file/";
		// if (!url.startsWith(prefix)) return null;

		// const withoutPrefix = url.slice(prefix.length);

		// Split from the end to avoid issues with ":" in Windows paths
		const parts = url.slice(1).split(":");

		if (parts.length < 3) return null;

		// const column = Number(parts.pop());
		const line = Number(parts.pop());
		const encodedPath = parts.join(":");

		const fileName = encodedPath.split("/").pop() ?? "file name";

		// if (isNaN(line) || isNaN(column)) return null;
		if (isNaN(line) ) return null;

		const filePath = decodeURIComponent(encodedPath);

		return {
			filePath,
			line,
			// column,
			fileName
		};
	} catch {
		return null;
	}
}
