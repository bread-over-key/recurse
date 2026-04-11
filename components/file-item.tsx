import { parseVSCodeUrl } from "@/lib/vs-code"
import { Item } from "@/types/item"
import { useMemo } from "react"
import OpenInVSCode from "./open-in-vscode"


 export default function FileItem({ item }: { item: Item }) {

	const file = useMemo(() => {

		return parseVSCodeUrl(item.title)

	}, [item])

	if (file)
		return <OpenInVSCode filePath={file.filePath} line={file.line}>{file.fileName}</OpenInVSCode>
	else
		return <>error parsing file</>
}
